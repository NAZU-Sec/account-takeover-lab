const express = require('express');
const hunterRouter = express.Router();

hunterRouter.post('/register', function(req, res){
	try{
		res.status(201);
		res.send("User Register!")
	} catch (err){
		res.status(400);
		res.send(err.message)
	}
});

hunterRouter.post('/login', function(req, res){
	try{
		res.status(201);
		res.send("User Login!")
	} catch (err){
		res.status(400);
		res.send(err.message)
	}
})

hunterRouter.get('/', function(req, res){
	res.status(200).send("Hello Hackers!")
});

module.exports = hunterRouter;