const user = require('../models/userModel.model');

const getLoginPage = (req, res) => {
    res.sendFile("login.html", { root: "./views/pages/examples" });
  };

const getRegisterPage = (req, res) => {
    res.sendFile("register.html", { root: "./views/pages/examples" });
  };

const postRegisterPage = (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const retypePassword = req.body.retypePassword;

  if(password.length < 6 || !name || !email) {
    res.json({message: 'Registration failed'});
  }
  res.json({message: 'Registration successful'});
};
  

module.exports = {getLoginPage, getRegisterPage, postRegisterPage};