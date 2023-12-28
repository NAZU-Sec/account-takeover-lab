const bcrypt = require('bcryptjs');
const User = require('../models/user');

function validateInputs(req) {
  const errors = [];

  // Validate username
  const username = req.body.username;
  if (!username || username.length < 5 || !/^[a-zA-Z0-9_]+$/.test(username)) {
    errors.push("Username is required and must be at least 5 characters long. It can only contain letters, numbers, and underscores.");
  }

  // Validate password
  const password = req.body.password;
  if (!password || password.length < 8) {
    errors.push("Password is required and must be at least 8 characters long.");
  }

  return errors.length === 0 ? null : errors;
}

module.exports.loginUser = async (req, res) => {
  try {
    // Validate inputs
    const validationErrors = validateInputs(req);
    if (validationErrors) {
      res.status(400).json({ errors: validationErrors });
      return;
    }

    const { username, password } = req.body;

    // Find user in database
    const user = await User.findOne({ username });

    // Check if user exists and password matches
    if (user && await bcrypt.compare(password, user.password)) {
      // Create session
      req.session.user = user;

      res.status(200).json({ message: "Login successful!" });
    } else {
      res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed due to an unexpected error" });
  }
};
