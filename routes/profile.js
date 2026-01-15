const express = require("express");
const router = express.Router();

const User = require("../model/user");
const wrapAsync = require("../util/wrapAsync");
const { isLoggedIn } = require("../middleware");

router.get("/profile", isLoggedIn, (req, res) => {
  res.render("pages/profile.ejs", { user: req.user });
});

router.get("/profile/edit", isLoggedIn, (req, res) => {
  res.render("pages/profileEdit.ejs", { user: req.user });
});

router.post(
  "/profile/edit",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, req.body);
    res.redirect("/profile");
  })
);

module.exports = router;
