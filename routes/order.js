const express = require("express");
const router = express.Router();

const crypto = require("crypto");
const Service = require("../model/service");
const Order = require("../model/order");
const User = require("../model/user");
const wrapAsync = require("../util/wrapAsync");
const ExpressError = require("../util/ExpressError");
const { isLoggedIn } = require("../middleware");

router.get(
  "/services/:slug/order",
  wrapAsync(async (req, res) => {
    const service = await Service.findOne({ slug: req.params.slug });
    if (!service) throw new ExpressError(404, "Service not found");
    res.render("orders/new.ejs", { service });
  })
);

router.post(
  "/services/:slug/order",
  wrapAsync(async (req, res, next) => {
    const service = await Service.findOne({ slug: req.params.slug });
    if (!service) throw new ExpressError(404, "Service not found");

    let user = req.user;

    if (!user) {
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        user = existingUser;
      } else {
        const password = crypto.randomBytes(6).toString("hex");
        user = new User({ ...req.body, username: req.body.email });
        await User.register(user, password);
      }
    }

    const order = new Order({
      user: user._id,
      service: service._id,
      customer: req.body,
      ...req.body,
    });

    await order.save();

    if (!req.isAuthenticated()) {
      return req.login(user, err => {
        if (err) return next(err);
        res.redirect("/orders/my");
      });
    }

    res.redirect("/orders/my");
  })
);

router.get(
  "/orders/my",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const orders = await Order.find({ user: req.user._id })
      .populate("service")
      .sort({ createdAt: -1 });

    res.render("orders/myOrders.ejs", { orders });
  })
);

module.exports = router;
