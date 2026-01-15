const express = require("express");
const router = express.Router();

const Service = require("../model/service");
const Review = require("../model/review");
const wrapAsync = require("../util/wrapAsync");
const ExpressError = require("../util/ExpressError");
const { isLoggedIn } = require("../middleware");

router.post(
  "/:slug/reviews",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const service = await Service.findOne({ slug: req.params.slug });
    if (!service) throw new ExpressError(404, "Service not found");

    const review = new Review({
      ...req.body.review,
      author: req.user._id,
      service: service._id,
    });

    await review.save();
    service.reviews.push(review._id);
    await service.save();

    res.redirect(`/services/${service.slug}`);
  })
);

router.delete(
  "/:slug/reviews/:reviewId",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const review = await Review.findById(req.params.reviewId);
    if (!review) throw new ExpressError(404, "Review not found");

    if (
      !review.author.equals(req.user._id) &&
      req.user.role !== "admin"
    ) {
      throw new ExpressError(403, "Not allowed");
    }

    await Review.findByIdAndDelete(req.params.reviewId);
    res.redirect(`/services/${req.params.slug}`);
  })
);

module.exports = router;
