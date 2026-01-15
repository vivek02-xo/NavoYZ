const express = require("express");
const passport = require("passport");
const router = express.Router();

const User = require("../model/user");
const wrapAsync = require("../util/wrapAsync");
const { validateSignup } = require("../middleware");
const { isLoggedIn, isNotLoggedIn } = require("../middleware");
  
router.get("/signup", isNotLoggedIn, (req, res) => {
  res.render("auth/signup.ejs");
});

router.post(
  "/signup",
  isNotLoggedIn,
  validateSignup,
  wrapAsync(async (req, res, next) => {
    const { name, username, email, password } = req.body;
    const user = new User({ name, username, email });
    const registeredUser = await User.register(user, password);

    req.login(registeredUser, err => {
      if (err) return next(err);
      res.redirect("/profile");
    });
  })
);

router.get("/login", isNotLoggedIn, (req, res) => {
  res.render("auth/login.ejs");
});

router.post(
  "/login",
  isNotLoggedIn,
  passport.authenticate("local", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    res.redirect("/");
  }
);

router.post("/logout", isLoggedIn, (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect("/");
  });
});

module.exports = router;
