const express = require('express');
const { challenges } = require('../challenges/registry');
const router = express.Router();

const DEMO_USERNAME = 'session_fixation_demo';
const DEMO_PASSWORD = 'session_fixation_pass';

function buildSessionState(req) {
  const session = req.session || {};

  return {
    initialized: Boolean(session.initialized),
    authenticated: Boolean(session.authenticated),
    user: session.user || null,
    username: session.user || null,
    authMethod: session.authMethod || null,
    sessionId: req.sessionID,
  };
}

function redirectChallenge(res, query = {}) {
  const params = new URLSearchParams(query).toString();
  const target = params ? `/dashboard/level1/session-fixation?${params}` : '/dashboard/level1/session-fixation';
  res.redirect(target);
}

router.get('/', (req, res) => {
  const challengesByLevel = challenges.reduce((levels, challenge) => {
    if (!levels[challenge.level]) {
      levels[challenge.level] = [];
    }
    levels[challenge.level].push(challenge);
    return levels;
  }, {});

  res.render('dashboard', { challengesByLevel });
});

router.get('/level1', (req, res) => {
  res.send('This is level 1 of the dashboard.');
  console.log('Accessed level1 route');
});

// GET level1: brute-force attacks
router.get('/level1/task-1', (req, res) => {
  console.log('Accessed level1/task-1 route');
  res.render('../challenges/level1/brute-force-attacks/index.ejs');
});
// POST level1: brute-force attacks
router.post('/level1/task-1', (req, res) => {
  console.log('Accessed level1/task-1 POST route');
  const { username, password } = req.body;

  // Check if the username and password are correct
  if (username === 'account_takeover_user' && password === 'account_takeover_pass') {
    // Redirect the user to the congratulations page
    res.redirect('/dashboard/level1/task-1/congratulations');
  } else {
    // Redirect the user back to the login page
    res.redirect('/dashboard/level1/task-1');
  }
});

router.get('/level1/task-1/congratulations', (req, res) => {
  console.log('Accessed level1/task-1/congratulations route');
  res.send('Congratulations! You have successfully logged in.');
});

router.get('/level1/session-fixation', (req, res) => {
  const state = buildSessionState(req);
  res.render('../challenges/level1/session-fixation/index.ejs', {
    state,
    message: req.query.message || '',
  });
});

router.get('/level1/session-fixation/status', (req, res) => {
  res.json(buildSessionState(req));
});

router.post('/level1/session-fixation/init', (req, res) => {
  req.session.initialized = true;
  req.session.authenticated = false;
  delete req.session.user;
  delete req.session.authMethod;

  req.session.save((error) => {
    if (error) {
      console.error('Session fixation init failed:', error);
      return res.status(500).send('Unable to initialize the training session.');
    }

    return redirectChallenge(res, { message: 'Session initialized for the pre-authentication demo.' });
  });
});

router.post('/level1/session-fixation/vulnerable-login', (req, res) => {
  const { username, password } = req.body || {};

  if (username !== DEMO_USERNAME || password !== DEMO_PASSWORD) {
    req.session.authenticated = false;
    delete req.session.user;
    delete req.session.authMethod;

    return req.session.save((error) => {
      if (error) {
        console.error('Vulnerable login save failed:', error);
        return res.status(500).send('Unable to save the failed login state.');
      }

      return redirectChallenge(res, { message: 'Invalid credentials. No authentication state was set.' });
    });
  }

  req.session.authenticated = true;
  req.session.user = username;
  req.session.authMethod = 'vulnerable';

  return req.session.save((error) => {
    if (error) {
      console.error('Vulnerable login save failed:', error);
      return res.status(500).send('Unable to save the vulnerable login state.');
    }

    return redirectChallenge(res, { message: 'Vulnerable flow: the original session ID was kept after login.' });
  });
});

router.post('/level1/session-fixation/secure-login', (req, res) => {
  const { username, password } = req.body || {};

  if (username !== DEMO_USERNAME || password !== DEMO_PASSWORD) {
    req.session.authenticated = false;
    delete req.session.user;
    delete req.session.authMethod;

    return req.session.save((error) => {
      if (error) {
        console.error('Secure login save failed:', error);
        return res.status(500).send('Unable to save the failed secure login state.');
      }

      return redirectChallenge(res, { message: 'Invalid credentials. The secure demo remained unauthenticated.' });
    });
  }

  return req.session.regenerate((error) => {
    if (error) {
      console.error('Session regeneration failed:', error);
      return res.status(500).send('Unable to rotate the session identifier after authentication.');
    }

    req.session.authenticated = true;
    req.session.user = username;
    req.session.authMethod = 'secure';
    req.session.initialized = true;

    return req.session.save((saveError) => {
      if (saveError) {
        console.error('Secure login save failed after regeneration:', saveError);
        return res.status(500).send('Unable to persist the secure authenticated session.');
      }

      return redirectChallenge(res, { message: 'Secure flow: the session ID was regenerated after login.' });
    });
  });
});

router.post('/level1/session-fixation/reset', (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.error('Session reset failed:', error);
      return res.status(500).send('Unable to reset the demonstration session.');
    }

    return res.clearCookie('connect.sid').redirect('/dashboard/level1/session-fixation');
  });
});

router.get('/level2', (req, res) => {
  res.send('This is level 2 of the dashboard.');
});

router.get('/level3', (req, res) => {
  res.send('This is level 3 of the dashboard.');
});

router.get('/level4', (req, res) => {
  res.send('This is level 4 of the dashboard.');
});

module.exports = router;