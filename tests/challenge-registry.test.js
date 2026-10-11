const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { describe, it } = require('node:test');

const { challenges, getChallengeById } = require('../challenges/registry');

const allowedStatuses = new Set(['implemented', 'partial', 'planned']);

function getChallengeDirectories() {
  const challengesRoot = path.join(__dirname, '..', 'challenges');
  const directories = [];

  for (const levelEntry of fs.readdirSync(challengesRoot, { withFileTypes: true })) {
    if (!levelEntry.isDirectory() || !/^level\d+$/.test(levelEntry.name)) {
      continue;
    }

    const levelPath = path.join(challengesRoot, levelEntry.name);
    for (const challengeEntry of fs.readdirSync(levelPath, { withFileTypes: true })) {
      if (challengeEntry.isDirectory()) {
        directories.push(
          path.posix.join('challenges', levelEntry.name, challengeEntry.name),
        );
      }
    }
  }

  return directories.sort();
}

describe('challenge registry', () => {
  it('has unique IDs', () => {
    const ids = challenges.map((challenge) => challenge.id);

    assert.equal(new Set(ids).size, ids.length);
  });

  it('uses valid levels and allowed implementation statuses', () => {
    for (const challenge of challenges) {
      assert.ok(Number.isInteger(challenge.level) && challenge.level >= 1 && challenge.level <= 4);
      assert.ok(allowedStatuses.has(challenge.status));
    }
  });

  it('looks up challenges by ID and returns undefined for unknown IDs', () => {
    const challenge = challenges[0];

    assert.equal(getChallengeById(challenge.id), challenge);
    assert.equal(getChallengeById('not-a-challenge'), undefined);
  });

  it('covers all nine existing challenge directories', () => {
    const registeredDirectories = challenges
      .map((challenge) => challenge.relativeDirectory)
      .sort();

    assert.equal(challenges.length, 9);
    assert.deepEqual(registeredDirectories, getChallengeDirectories());
  });
});
