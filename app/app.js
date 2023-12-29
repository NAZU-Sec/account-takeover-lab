// app.js
const ejs = require('ejs');
const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan');
app.use(morgan('dev'));
const hunterRouter = require('../routes/userRoute')
const chalRouter = require('../routes/chalRoute')

// sesssion
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');


// middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.set('view cache', false);
app.use(express.static(path.join(__dirname, '../public')));


app.use(expressSession({
	secret: "407b020516b12ae74c9bd2ece2ed546c44d4ddcd4f05d816bf26ad71b41bc179",
	resave: false,
	saveUninitialized: false,
	cookie: {
		secure: false,
		httpOnly: true,
	},
}));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Main Route
app.use('/', hunterRouter);

// Challenge Route
app.use('/dashboard/level', chalRouter);

module.exports = app;
