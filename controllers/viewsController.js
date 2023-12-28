// viewsController.js

exports.renderRegisterPage = (req, res) => {
  res.render('register', { errors: [], successMessage: '' });
};

exports.renderLoginPage = (req, res, errorMessage = '') => {
  res.render('login', { errorMessage });
};

