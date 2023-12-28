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
	secret: "407b020516b12ae74c9bd2ece2ed546c44d4ddcd4f05d816bf26ad71b41bc179",
	resave: false,
	saveUninitialized: false,
}));

app.use(cookieParser());
app.use(express.json());

// Main Route
app.use('/', hunterRouter);

// Challenge Route
app.use('/level', chalRouter);

module.exports = app;
