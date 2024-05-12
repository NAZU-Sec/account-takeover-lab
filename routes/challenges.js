// routes/challenges.js

const express = require('express');
const router = express.Router();


// level 1
router.get('/level1', (req, res) => {
  console.log('Accessed level1 route');
  res.send('Welcome to level 1 of the challenges!');
});


router.get('/level2', (req, res) => {
  res.send('Welcome to level 2 of the challenges!');
});

router.get('/level3', (req, res) => {
  res.send('Welcome to level 3 of the challenges!');
});

router.get('/level4', (req, res) => {
  res.send('Welcome to level 4 of the challenges!');
});

module.exports = router;