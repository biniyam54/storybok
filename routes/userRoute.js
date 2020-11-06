const {
  register,
  registerUser,
  login,
  loginUser,
} = require("../controllers/userController");
const passport = require("passport");
const { ensureGuest } = require("../middlewares/auth");

const router = require("express").Router();

router.route("/register").get(ensureGuest, register).post(registerUser);
router.route("/login").get(ensureGuest, login).post(loginUser);

module.exports = router;
// .post(loginUser);
