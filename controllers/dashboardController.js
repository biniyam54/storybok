const passport = require("passport");
const User = require("../models/User");

exports.dashboard = async (req, res, next) => {
  res.render("dashboard", {
    user: req.user,
  });
};
