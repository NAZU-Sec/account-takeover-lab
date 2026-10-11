const assert = require('node:assert/strict');
const http = require('node:http');
const { after, before, describe, it } = require('node:test');

const { challenges } = require('../challenges/registry');
const app = require('../app/app');

describe('dashboard challenge catalogue', () => {
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

  function getCatalogue() {
    return new Promise((resolve, reject) => {
      http.get(new URL('/dashboard', baseUrl), (res) => {
        let body = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          body += chunk;
        });
        res.on('end', () => resolve({ statusCode: res.statusCode, body }));
      }).on('error', reject);
    });
  }

  it('responds successfully with challenges grouped under their levels', async () => {
    const response = await getCatalogue();

    assert.equal(response.statusCode, 200);
    for (const level of new Set(challenges.map((challenge) => challenge.level))) {
      assert.match(response.body, new RegExp(`<h2>Level ${level}</h2>`));
    }
  });

  it('renders each challenge title, description, and status from the registry', async () => {
    const response = await getCatalogue();

    for (const challenge of challenges) {
      const item = response.body.match(
        new RegExp(`<li data-challenge-id="${challenge.id}">([\\s\\S]*?)</li>`),
      );

      assert.ok(item, `missing catalogue entry for ${challenge.id}`);
      assert.ok(item[1].includes(challenge.title), `missing title for ${challenge.id}`);
      assert.ok(item[1].includes(challenge.description), `missing description for ${challenge.id}`);
      assert.ok(item[1].includes(challenge.status), `missing status for ${challenge.id}`);
    }
  });

  it('links the partial brute-force challenge to its existing page', async () => {
    const response = await getCatalogue();

    assert.match(
      response.body,
      /<a href="\/dashboard\/level1\/task-1">Brute-Force Attacks<\/a>/,
    );
  });

  it('does not link planned challenges to nonexistent pages', async () => {
    const response = await getCatalogue();

    for (const challenge of challenges.filter(({ status }) => status === 'planned')) {
      const item = response.body.match(
        new RegExp(`<li data-challenge-id="${challenge.id}">([\\s\\S]*?)</li>`),
      );

      assert.ok(item, `missing catalogue entry for ${challenge.id}`);
      assert.doesNotMatch(item[1], /<a\b/);
      assert.match(item[1], /<span class="challenge-status">planned<\/span>/);
    }
  });
});
