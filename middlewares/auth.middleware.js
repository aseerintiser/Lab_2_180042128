const LocalStorage = require("node-localstorage").LocalStorage;
const localStorage = new LocalStorage("./scratch");
const alert = require("alert");

const isLoggedIn = (req, res, next) => {
    const name = localStorage.getItem("name");
  
        if (name) {
          alert(`Logged in as ${name}`);
          next();
        } else {
            alert('Not signed in');
            res.redirect("/login");
        }
    
  };
  
  module.exports = isLoggedIn;