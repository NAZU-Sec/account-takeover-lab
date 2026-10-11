const assert = require('node:assert/strict');
const http = require('node:http');
const { after, before, describe, it } = require('node:test');

const app = require('../app/app');

describe('Level 1 brute-force challenge', () => {
  let server;
  let baseUrl;

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

  function request(path, method = 'GET', body) {
    return new Promise((resolve, reject) => {
      const headers = {};
      let requestBody;

      if (body) {
        requestBody = new URLSearchParams(body).toString();
        headers['content-type'] = 'application/x-www-form-urlencoded';
        headers['content-length'] = Buffer.byteLength(requestBody);
      }

      const req = http.request(new URL(path, baseUrl), {
        method,
        headers,
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

  it('serves the challenge page with the existing POST endpoint as its form action', async () => {
    const response = await request('/dashboard/level1/task-1');

    assert.equal(response.statusCode, 200);
    assert.match(response.body, /<form action="\/dashboard\/level1\/task-1" method="post">/);
  });

  it('redirects incorrect credentials back to the challenge page', async () => {
    const response = await request('/dashboard/level1/task-1', 'POST', {
      username: 'incorrect',
      password: 'credentials',
    });

    assert.equal(response.statusCode, 302);
    assert.equal(response.headers.location, '/dashboard/level1/task-1');
  });

  it('redirects the training credentials to the congratulations endpoint', async () => {
    const response = await request('/dashboard/level1/task-1', 'POST', {
      username: 'account_takeover_user',
      password: 'account_takeover_pass',
    });

    assert.equal(response.statusCode, 302);
    assert.equal(response.headers.location, '/dashboard/level1/task-1/congratulations');
  });

  it('serves the congratulations endpoint', async () => {
    const response = await request('/dashboard/level1/task-1/congratulations');

    assert.equal(response.statusCode, 200);
    assert.match(response.body, /Congratulations! You have successfully logged in\./);
  });
});
