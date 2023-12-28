// app.js

const express = require('express');
const app = express();

app.get('/', function(req, res){
	res.send("Hello Hackers!")
});

app.get('/level1', function(req, res){
	res.send('Easy level Lab!')
});

app.get('/level2', function(req, res){
	res.send('Medium level Lab!')
});

app.get('/level3', function(req, res){
	res.send('Hard level Lab!')
});

app.get('/level4', function(req, res){
	res.send('Very Hard level Lab!')
});

module.exports = app;
