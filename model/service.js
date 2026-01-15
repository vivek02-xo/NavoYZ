const mongoose = require("mongoose");
const Review = require("./review");

const priceSchema = new mongoose.Schema({
  label: String,
  minPrice: Number,
  maxPrice: Number,
  billingType: {
    type: String,
    enum: ["one-time", "monthly", "hourly"],
    default: "one-time",
  },
});

const processSchema = new mongoose.Schema({
  step: Number,
  title: String,
  description: String,
});

const faqSchema = new mongoose.Schema({
  question: String,
  answer: String,
});

const useCaseSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    shortDescription: { type: String, required: true },
    longDescription: String,

    whatYouGet: [String],
    deliverables: [String],
    techStack: [String],
    process: [processSchema],
    useCases: [useCaseSchema],
    faqs: [faqSchema],

    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],

    pricing: [priceSchema],
    estimatedTimeline: String,

    isRecurring: { type: Boolean, default: false },

    category: {
      type: String,
      enum: [
        "website",
        "automation",
        "ai",
        "ecommerce",
        "maintenance",
        "consulting",
        "saas",
      ],
      required: true,
    },

    isPopular: { type: Boolean, default: false },
    trustBadges: [String],
    ctaText: { type: String, default: "Start this project" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

/* ✅ CASCADE DELETE REVIEWS */
serviceSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({ service: doc._id });
  }
});

module.exports = mongoose.model("Service", serviceSchema);
