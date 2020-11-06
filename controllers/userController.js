const passport = require("passport");
const User = require("../models/User");

exports.register = async (req, res, next) => {
  res.render("register", {
    layout: "auth",
  });
};

exports.registerUser = async (req, res, next) => {
  let errors = [];

  const { name, email, password, password2 } = req.body;

  //check all fields
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please fill in all field" });
  }

  //password length
  if (password.length < 6) {
    errors.push({ msg: "Password should be atleast six chars" });
  }

  //password match
  if (password !== password2) {
    errors.push({ msg: "Password do not match" });
  }

  if (errors.length > 0) {
    res.render("register", {
      layout: "auth",
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    try {
      const user = await User.findOne({ email });

      //check if email exist
      if (user) {
        errors.push({ msg: "That email is already used!" });
        res.render("register", {
          layout: "aumatchPasswordth",
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new User({ name, email, password });
        await newUser.save();
        await req.login(newUser, (err) => {
          if (err) {
            console.log(err);
          } else {
            res.redirect("/");
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
};

exports.login = async (req, res, next) => {
  res.render("login", {
    layout: "auth",
  });
};

exports.loginUser = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
};
