const challenges = [
  {
    id: 'brute-force-attacks',
    title: 'Brute-Force Attacks',
    level: 1,
    relativeDirectory: 'challenges/level1/brute-force-attacks',
    description: 'Explore password guessing against a synthetic account.',
    status: 'partial',
  },
  {
    id: 'session-fixation',
    title: 'Session Fixation',
    level: 1,
    relativeDirectory: 'challenges/level1/session-fixation',
    description: 'Study how an attacker-controlled session can affect account access.',
    status: 'planned',
  },
  {
    id: 'weak-passwords',
    title: 'Weak Passwords',
    level: 1,
    relativeDirectory: 'challenges/level1/weak-passwords',
    description: 'Examine how weak credentials can enable account compromise.',
    status: 'planned',
  },
  {
    id: 'csrf',
    title: 'Cross-Site Request Forgery',
    level: 2,
    relativeDirectory: 'challenges/level2/csrf',
    description: 'Explore unauthorized state changes made through a victim session.',
    status: 'planned',
  },
  {
    id: 'xss',
    title: 'Cross-Site Scripting',
    level: 2,
    relativeDirectory: 'challenges/level2/xss',
    description: 'Study how injected script can affect a user or account session.',
    status: 'planned',
  },
  {
    id: 'logic-flows',
    title: 'Logic Flows',
    level: 3,
    relativeDirectory: 'challenges/level3/logic-flows',
    description: 'Inspect account workflows for exploitable business-logic gaps.',
    status: 'planned',
  },
  {
    id: 'oauth-vuln',
    title: 'OAuth Vulnerabilities',
    level: 3,
    relativeDirectory: 'challenges/level3/oauth-vuln',
    description: 'Explore account-linking and identity-validation weaknesses.',
    status: 'planned',
  },
  {
    id: 'file-upload-vuln',
    title: 'File Upload Vulnerabilities',
    level: 4,
    relativeDirectory: 'challenges/level4/file-upload-vuln',
    description: 'Study how unsafe uploads can expose or compromise an account.',
    status: 'planned',
  },
  {
    id: 'rce',
    title: 'Remote Code Execution',
    level: 4,
    relativeDirectory: 'challenges/level4/rce',
    description: 'Explore the account impact of unsafe command execution.',
    status: 'planned',
  },
];

function getChallengeById(id) {
  return challenges.find((challenge) => challenge.id === id);
}

module.exports = { challenges, getChallengeById };
