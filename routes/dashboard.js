const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to the dashboard!');
});

router.get('/level1', (req, res) => {
  res.send('This is level 1 of the dashboard.');
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