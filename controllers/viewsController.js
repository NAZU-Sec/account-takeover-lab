// viewsController.js
// only for rendring them using get req. this controller can't controlle the post req

exports.renderRegisterPage = (req, res) => {
  res.render('register', { errors: [], successMessage: '' });
};

exports.renderLoginPage = (req, res, errorMessage = '', registrationSuccess = false) => {
  res.render('login', { errorMessage, registrationSuccess });
};

