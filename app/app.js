// app.js

const express = require('express');
const app = express();
const morgan = require('morgan');
app.use(morgan('dev'));



// Route
// register page
app.post('/register', function(req, res){
	try{
		res.status(201);
		res.send("User Register!")
	} catch (err){
		res.status(400);
		res.send(err.message)
	}
});

// login page
app.post('/login', function(req, res){
	try{
		res.status(201);
		res.send("User Login!")
	} catch (err){
		res.status(400);
		res.send(err.message)
	}
});

// Home page
app.get('/', function(req, res){
	res.status(200);
	res.send("Hello Hackers!")
});

app.use('/level', function(req, res){
	if (req.method === 'GET') {
    res.send('Easy level Lab!');
  } else if (req.method === 'POST') {
    console.log('Received POST data:', req.body);
    res.send('Solution submitted successfully!');
  } else {
    res.status(405).send('Method not allowed');
  }
});


module.exports = app;
