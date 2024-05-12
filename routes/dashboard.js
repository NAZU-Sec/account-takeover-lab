const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to the dashboard!');
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
    res.redirect('/level1/task-1/congratulations');
  } else {
    // Redirect the user back to the login page
    res.redirect('/level1/task-1');
  }
});

router.get('/level1/task-1/congratulations', (req, res) => {
  console.log('Accessed level1/task-1/congratulations route');
  res.send('Congratulations! You have successfully logged in.');
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