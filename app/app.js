// app.js

const express = require('express');
const app = express();
const morgan = require('morgan');
app.use(morgan('dev'));
const hunterRouter = require('../routes/userRoute')
const chalRouter = require('../routes/chalRoute')

// sesssion
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');

app.use(expressSession({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
}));

app.use(cookieParser());

// Main Route
app.use('/', hunterRouter);

// Challenge Route
app.use('/level', chalRouter);

module.exports = app;
