const express = require('express');
const hunterRouter = express.Router();
const registerUser = require('../controllers/registerController').registerUser;
const loginUser = require('../controllers/loginController').loginUser;

// Hunter register page
hunterRouter.post('/register', registerUser);

// Hunter login page
hunterRouter.post('/login', loginUser)

// Hunter home page
hunterRouter.get('/', function(req, res){
	res.status(200).send("Hello Hackers!")
});

module.exports = hunterRouter;