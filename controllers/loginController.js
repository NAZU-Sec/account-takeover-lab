// loginController.js

const bcrypt = require('bcryptjs');
const User = require('../models/user');
const viewsController = require('./viewsController'); // Adjust the path as needed

function validateInputs(req) {
  const errors = [];

  const username = req.body.username;
  if (!username || username.length < 5 || !/^[a-zA-Z0-9_]+$/.test(username)) {
    errors.push("Username is required and must be at least 5 characters long.");
  }

  const password = req.body.password;
  if (!password || password.length < 8) {
    errors.push("Password is required and must be at least 8 characters long.");
  }

  return errors.length === 0 ? null : errors;
}

exports.loginUser = async (req, res) => {
  try {
    const registrationSuccess = req.query.registrationSuccess === 'true';
    const validationErrors = validateInputs(req);

    if (validationErrors) {
      return viewsController.renderLoginPage(req, res, 'Invalid username or password', registrationSuccess);
    }

    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && await bcrypt.compare(password, user.password)) {
      req.session.user = user;
      return res.redirect('/dashboard');
    } else {
      return res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Login failed due to an unexpected error" });
  }
};
