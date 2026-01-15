const express = require("express");
const router = express.Router();

const Service = require("../model/service");
const wrapAsync = require("../util/wrapAsync");

router.get(
  "/",
  wrapAsync(async (req, res) => {
    const services = await Service.find().sort({ order: 1 }).limit(4);
    res.render("pages/home.ejs", { services });
  })
);

router.get("/contact", (req, res) => {
  res.render("pages/contact.ejs");
});

module.exports = router;
