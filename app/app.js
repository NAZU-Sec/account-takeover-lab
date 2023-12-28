// app.js

const express = require('express');
const app = express();
const morgan = require('morgan');
app.use(morgan('dev'));
const hunterRouter = require('../routes/userRoute')
const chalRouter = require('../routes/chalRoute')


// Main Route
app.use('/', hunterRouter);

// Challenge Route
app.use('/level', chalRouter);

module.exports = app;
