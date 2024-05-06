const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to the users page!');
});

router.get('/:id', (req, res) => {
  res.send(`Welcome to user ${req.params.id}'s page!`);
});

module.exports = router;