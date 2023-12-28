const express = require('express');
const chalRouter = express.Router();

chalRouter.get('/1', function(req, res) {
  res.status(200).send("Hello Hackers! this is GET req for level 1");
});

chalRouter.post('/1', function(req, res) {
  res.status(200).send("Hello Hackers! this is POST req for level 1");
});

chalRouter.get('/2', function(req, res) {
  res.status(200).send("Hello Hackers! this is GET req for level 2");
});

chalRouter.post('/2', function(req, res) {
  res.status(200).send("Hello Hackers! this is POST req for level 2");
});

chalRouter.get('/3', function(req, res) {
  res.status(200).send("Hello Hackers! this is GET req for level 3");
});

chalRouter.post('/3', function(req, res) {
  res.status(200).send("Hello Hackers! this is POST req for level 3");
});


chalRouter.get('/4', function(req, res) {
  res.status(200).send("Hello Hackers! this is GET req for level 4");
});

chalRouter.post('/4', function(req, res) {
  res.status(200).send("Hello Hackers! this is POST req for level 4");
});

module.exports = chalRouter;