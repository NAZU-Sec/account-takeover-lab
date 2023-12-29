const express = require('express');
const hunterRouter = express.Router();
const registerUser = require('../controllers/registerController').registerUser;
const loginUser = require('../controllers/loginController').loginUser;
const viewsController = require('../controllers/viewsController');
const authMiddleware = require('../middlewares/authMiddleware'); // Adjust the path as needed
const chalRoute = require('./chalRoute');

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

// Dashboard page
hunterRouter.get('/dashboard', authMiddleware, (req, res) => {
  res.render('dashboard');
});

// Include the chalRouter under /dashboard/level
hunterRouter.use('/dashboard/level', authMiddleware, chalRoute);

module.exports = hunterRouter;