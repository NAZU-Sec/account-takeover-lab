// registerController.js
// to handle the post req from register.ejs

const bcrypt = require('bcryptjs');
const User = require('../models/user');

module.exports.registerUser = async (req, res) => {
  try {
    console.log(req.body);

    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
if (existingUser) {
  const errors = ["Username is already taken."];
  res.status(400).render('register', { errors, successMessage: '' });
  return;
}

    const hashedPassword = await bcrypt.hash(password ?? '', 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    
    req.session.user = {
      _id: newUser._id,
      username: newUser.username
    };

    // res.render('register', { errors: [], successMessage: 'User registered successfully!' });
    res.redirect('/login?registrationSuccess=true');
    


  } catch (err) {
    console.error(err);
    res.render('register', { errors: ['Registration failed due to an unexpected error.'], successMessage: '' }); // Pass errors instead
  }
};
