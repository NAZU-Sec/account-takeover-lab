const assert = require('node:assert/strict');
const http = require('node:http');
const { after, before, describe, it } = require('node:test');

const app = require('../app/app');

let baseUrl;

function decodeSessionId(rawCookieValue) {
  const decoded = decodeURIComponent(rawCookieValue);
  return decoded.replace(/^s:/, '').split('.')[0];
}

function extractSessionCookie(response) {
  const setCookie = response.headers['set-cookie'];
  const values = Array.isArray(setCookie) ? setCookie : [setCookie].filter(Boolean);
  const match = values.find((header) => header.startsWith('connect.sid='));

  if (!match) {
    return null;
  }

  return match.split(';')[0].slice('connect.sid='.length);
}

function cookieHeader(rawCookieValue) {
  return rawCookieValue ? `connect.sid=${rawCookieValue}` : '';
}

function request(path, method = 'GET', body, headers = {}) {
  return new Promise((resolve, reject) => {
    const requestBody = body && typeof body === 'string'
      ? body
      : body
        ? new URLSearchParams(body).toString()
        : undefined;

    const nextHeaders = { ...headers };
    if (requestBody) {
      nextHeaders['content-type'] = 'application/x-www-form-urlencoded';
      nextHeaders['content-length'] = Buffer.byteLength(requestBody);
    }

    const req = http.request(new URL(path, baseUrl), {
      method,
      headers: nextHeaders,
    }, (res) => {
      let responseBody = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        responseBody += chunk;
      });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: responseBody,
        });
      });
    });

    req.on('error', reject);
    req.end(requestBody);
  });
}

describe('Level 1 session fixation challenge', () => {
  let server;

  before(async () => {
    server = http.createServer(app);
    await new Promise((resolve, reject) => {
      server.once('error', reject);
      server.listen(0, '127.0.0.1', resolve);
    });
    baseUrl = `http://127.0.0.1:${server.address().port}`;
  });

  after(async () => {
    await new Promise((resolve, reject) => {
      server.close((error) => error ? reject(error) : resolve());
    });
  });

  it('serves the session-fixation challenge page with the expected controls', async () => {
    const response = await request('/dashboard/level1/session-fixation');

    assert.equal(response.statusCode, 200);
    assert.match(response.body, /Session Fixation/);
    assert.match(response.body, /Initialize pre-authentication session/);
    assert.match(response.body, /Run vulnerable login/);
    assert.match(response.body, /Run secure login/);
    assert.match(response.body, /View current session state/);
    assert.match(response.body, /Reset session/);
  });

  it('initializes a pre-authentication session and issues a valid session cookie', async () => {
    const response = await request('/dashboard/level1/session-fixation/init', 'POST');
    const sessionCookie = extractSessionCookie(response);

    assert.equal(response.statusCode, 302);
    assert.ok(sessionCookie, 'expected a connect.sid cookie');

    const statusResponse = await request('/dashboard/level1/session-fixation/status', 'GET', undefined, {
      cookie: cookieHeader(sessionCookie),
    });
    const body = JSON.parse(statusResponse.body);

    assert.equal(statusResponse.statusCode, 200);
    assert.equal(body.initialized, true);
    assert.equal(body.authenticated, false);
  });

  it('keeps the existing session identifier during the vulnerable login flow', async () => {
    const initResponse = await request('/dashboard/level1/session-fixation/init', 'POST');
    const initialCookie = extractSessionCookie(initResponse);
    const initialSessionId = decodeSessionId(initialCookie);

    const loginResponse = await request(
      '/dashboard/level1/session-fixation/vulnerable-login',
      'POST',
      { username: 'session_fixation_demo', password: 'session_fixation_pass' },
      { cookie: cookieHeader(initialCookie) },
    );
    const statusResponse = await request('/dashboard/level1/session-fixation/status', 'GET', undefined, {
      cookie: cookieHeader(initialCookie),
    });
    const body = JSON.parse(statusResponse.body);

    assert.equal(loginResponse.statusCode, 302);
    assert.equal(body.authenticated, true);
    assert.equal(body.user, 'session_fixation_demo');
    assert.equal(body.authMethod, 'vulnerable');
    assert.equal(body.sessionId, initialSessionId);
  });

  it('regenerates the session identifier for the secure login flow', async () => {
    const initResponse = await request('/dashboard/level1/session-fixation/init', 'POST');
    const initialCookie = extractSessionCookie(initResponse);

    const loginResponse = await request(
      '/dashboard/level1/session-fixation/secure-login',
      'POST',
      { username: 'session_fixation_demo', password: 'session_fixation_pass' },
      { cookie: cookieHeader(initialCookie) },
    );
    const secureCookie = extractSessionCookie(loginResponse);
    const secureSessionId = decodeSessionId(secureCookie);

    assert.equal(loginResponse.statusCode, 302);
    assert.ok(secureCookie, 'expected a new connect.sid cookie');
    assert.notEqual(decodeSessionId(initialCookie), secureSessionId);

    const statusResponse = await request('/dashboard/level1/session-fixation/status', 'GET', undefined, {
      cookie: cookieHeader(secureCookie),
    });
    const body = JSON.parse(statusResponse.body);

    assert.equal(body.authenticated, true);
    assert.equal(body.user, 'session_fixation_demo');
    assert.equal(body.authMethod, 'secure');
    assert.equal(body.sessionId, secureSessionId);
  });

  it('prevents the old session identifier from accessing the secure authenticated session', async () => {
    const initResponse = await request('/dashboard/level1/session-fixation/init', 'POST');
    const initialCookie = extractSessionCookie(initResponse);
    const initialSessionId = decodeSessionId(initialCookie);

    const secureResponse = await request(
      '/dashboard/level1/session-fixation/secure-login',
      'POST',
      { username: 'session_fixation_demo', password: 'session_fixation_pass' },
      { cookie: cookieHeader(initialCookie) },
    );
    const secureCookie = extractSessionCookie(secureResponse);
    const secureSessionId = decodeSessionId(secureCookie);

    const oldSessionResponse = await request('/dashboard/level1/session-fixation/status', 'GET', undefined, {
      cookie: cookieHeader(initialCookie),
    });
    const oldState = JSON.parse(oldSessionResponse.body);

    assert.notEqual(initialSessionId, secureSessionId);
    assert.equal(oldState.authenticated, false);
    assert.notEqual(oldState.sessionId, secureSessionId);
  });

  it('does not establish authenticated state for invalid credentials', async () => {
    const initResponse = await request('/dashboard/level1/session-fixation/init', 'POST');
    const sessionCookie = extractSessionCookie(initResponse);

    const invalidResponse = await request(
      '/dashboard/level1/session-fixation/vulnerable-login',
      'POST',
      { username: 'wrong-user', password: 'wrong-pass' },
      { cookie: cookieHeader(sessionCookie) },
    );
    const statusResponse = await request('/dashboard/level1/session-fixation/status', 'GET', undefined, {
      cookie: cookieHeader(sessionCookie),
    });
    const body = JSON.parse(statusResponse.body);

    assert.equal(invalidResponse.statusCode, 302);
    assert.equal(body.authenticated, false);
    assert.equal(body.user, null);
    assert.equal(body.authMethod, null);
  });

  it('resets the demonstration and clears authentication state', async () => {
    const initResponse = await request('/dashboard/level1/session-fixation/init', 'POST');
    const sessionCookie = extractSessionCookie(initResponse);

    await request(
      '/dashboard/level1/session-fixation/vulnerable-login',
      'POST',
      { username: 'session_fixation_demo', password: 'session_fixation_pass' },
      { cookie: cookieHeader(sessionCookie) },
    );

    const resetResponse = await request('/dashboard/level1/session-fixation/reset', 'POST', undefined, {
      cookie: cookieHeader(sessionCookie),
    });
    const statusResponse = await request('/dashboard/level1/session-fixation/status', 'GET', undefined, {
      cookie: cookieHeader(sessionCookie),
    });
    const body = JSON.parse(statusResponse.body);

    assert.equal(resetResponse.statusCode, 302);
    assert.equal(body.authenticated, false);
    assert.equal(body.user, null);
  });

  it('links the session fixation challenge from the dashboard after it is implemented', async () => {
    const response = await request('/dashboard');

    assert.equal(response.statusCode, 200);
    assert.match(
      response.body,
      /<a href="\/dashboard\/level1\/session-fixation">Session Fixation<\/a>/,
    );
  });
});
