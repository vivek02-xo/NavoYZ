const express = require("express");
const router = express.Router();

const Service = require("../model/service");
const wrapAsync = require("../util/wrapAsync");
const ExpressError = require("../util/ExpressError");
const { isLoggedIn } = require("../middleware");

router.get(
  "/",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const services = await Service.find().sort({ order: 1 });
    res.render("pages/services.ejs", { services });
  })
);

router.get(
  "/:slug",
  wrapAsync(async (req, res) => {
    const service = await Service.findOne({ slug: req.params.slug })
      .populate({ path: "reviews", populate: { path: "author" } });

    if (!service) throw new ExpressError(404, "Service not found");
    res.render("pages/serviceShow.ejs", { service });
  })
);

module.exports = router;
