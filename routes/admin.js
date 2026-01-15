const express = require("express");
const router = express.Router();

const Service = require("../model/service");
const User = require("../model/user");
const Order = require("../model/order");
const wrapAsync = require("../util/wrapAsync");
const ExpressError = require("../util/ExpressError");
const { validateService, isAdmin } = require("../middleware");

router.get("/", isAdmin, (req, res) => {
  res.render("admin/dashboard.ejs");
});

router.get(
  "/services",
  isAdmin,
  wrapAsync(async (req, res) => {
    const services = await Service.find().sort({ order: 1 });
    res.render("admin/services.ejs", { services });
  })
);

router.get("/services/new", isAdmin, (req, res) => {
  res.render("admin/serviceNew.ejs");
});

router.post(
  "/services",
  isAdmin,
  validateService,
  wrapAsync(async (req, res) => {
    await Service.create(req.body.service);
    res.redirect("/admin/services");
  })
);

router.get(
  "/services/:id/edit",
  isAdmin,
  wrapAsync(async (req, res) => {
    const service = await Service.findById(req.params.id);
    res.render("admin/serviceEdit.ejs", { service });
  })
);

router.put(
  "/services/:id",
  isAdmin,
  wrapAsync(async (req, res) => {
    await Service.findByIdAndUpdate(req.params.id, req.body.service);
    res.redirect("/admin/services");
  })
);

router.delete(
  "/services/:id",
  isAdmin,
  wrapAsync(async (req, res) => {
    await Service.findByIdAndDelete(req.params.id);
    res.redirect("/admin/services");
  })
);

router.get(
  "/users",
  isAdmin,
  wrapAsync(async (req, res) => {
    const users = await User.find();
    res.render("admin/users.ejs", { users });
  })
);

router.get(
  "/orders",
  isAdmin,
  wrapAsync(async (req, res) => {
    const orders = await Order.find()
      .populate("user")
      .populate("service")
      .sort({ createdAt: -1 });

    res.render("admin/orders.ejs", { orders });
  })
);

router.get(
  "/orders/:id",
  isAdmin,
  wrapAsync(async (req, res) => {
    const order = await Order.findById(req.params.id)
      .populate("user")
      .populate("service");

    if (!order) throw new ExpressError(404, "Order not found");
    res.render("admin/orderShow.ejs", { order });
  })
);

module.exports = router;
