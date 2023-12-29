const express = require('express');
const hunterRouter = express.Router();
const registerUser = require('../controllers/registerController').registerUser;
const loginUser = require('../controllers/loginController').loginUser;
const viewsController = require('../controllers/viewsController');

// Hunter register page
hunterRouter.get('/register', viewsController.renderRegisterPage);
hunterRouter.post('/register', registerUser);

// Hunter login page
hunterRouter.get('/login', viewsController.renderLoginPage);
hunterRouter.post('/login', loginUser)

// Hunter home page
hunterRouter.get('/', function(req, res){
	res.render('home');
});

module.exports = hunterRouter;