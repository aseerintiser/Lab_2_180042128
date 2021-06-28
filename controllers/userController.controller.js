const User = require('../models/userModel.model');
const bcrypt = require('bcryptjs');
const alert = require('alert');
const LocalStorage = require("node-localstorage").LocalStorage;
localStorage = new LocalStorage("./scratch");

const getLoginPage = (req, res) => {
    res.sendFile("login.html", { root: "./views/pages/examples" });
  };

const getRegisterPage = (req, res) => {
    res.sendFile("register.html", { root: "./views/pages/examples" });
  };

const postRegisterPage = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const retypePassword = req.body.retypePassword;

  try{
    const user = await User.findOne({ email });

    if (user) {
      alert("There is already an existing account associated with this email.");
      res.redirect("/login");
    } else if (password.length < 6) {
      alert("Password must be of at least 6 characters.");
      res.redirect("/register");
    } else if (password !== retypePassword) {
      alert("Enter the same password.");
      res.redirect("/register");
    } else if (!name || !email) {
      alert("The form cannot be blank.");
      res.redirect("/register");
    } else {
      const salt = await bcrypt.genSaltSync(10);
      passwordHash = await bcrypt.hash(password, salt);
      const createUser = new User({
        name,
        email,
        passwordHash
      });

      await createUser.save();
      alert('Created successfully');
      res.redirect("/login");
      
    }

  } catch (error) {
    console.error(error);
    alert("Error detected");
    res.redirect("/register");
  }

};

const postLoginPage = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const passwordMatch = await bcrypt.compare(password, existingUser.passwordHash);

    if (passwordMatch) {
      localStorage.setItem("name", existingUser.name);
      res.redirect("/dashboard");
    } else {
      alert("Wrong Password");
      res.redirect("/login");
    }
  } else {
    alert("You are not registered\nPlease create an account");
    res.redirect("/register");
  }
};

module.exports = {getLoginPage, getRegisterPage, postRegisterPage, postLoginPage};