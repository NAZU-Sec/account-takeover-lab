const express = require('express');
const hunterRouter = express.Router();
const registerUser = require('../controllers/registerController').registerUser;

// Hunter register page
hunterRouter.post('/register', registerUser);

// Hunter login page
hunterRouter.post('/login', function(req, res){
	try{
		res.status(201);
		res.send("User Login!")
	} catch (err){
		res.status(400);
		res.send(err.message)
	}
})

// Hunter home page
hunterRouter.get('/', function(req, res){
	res.status(200).send("Hello Hackers!")
});

module.exports = hunterRouter;