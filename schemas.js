const Joi = require("joi");

/* ===== PRICE ===== */
const priceSchema = Joi.object({
  label: Joi.string().required(),
  minPrice: Joi.number().min(0).required(),
  maxPrice: Joi.number().min(Joi.ref("minPrice")).required(),
  billingType: Joi.string().valid("one-time", "monthly", "hourly"),
});

/* ===== PROCESS ===== */
const processSchema = Joi.object({
  step: Joi.number().min(1).required(),
  title: Joi.string().required(),
  description: Joi.string().allow(""),
});

/* ===== FAQ ===== */
const faqSchema = Joi.object({
  question: Joi.string().required(),
  answer: Joi.string().required(),
});

/* ===== USE CASE ===== */
const useCaseSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

/* ===== SERVICE ===== */
module.exports.serviceSchema = Joi.object({
  service: Joi.object({
    title: Joi.string().min(3).required(),
    slug: Joi.string().required(),
    shortDescription: Joi.string().min(10).required(),
    longDescription: Joi.string().allow(""),

    whatYouGet: Joi.array().items(Joi.string()),
    deliverables: Joi.array().items(Joi.string()),
    techStack: Joi.array().items(Joi.string()),

    process: Joi.array().items(processSchema),
    useCases: Joi.array().items(useCaseSchema),
    faqs: Joi.array().items(faqSchema),

    pricing: Joi.array().items(priceSchema),

    estimatedTimeline: Joi.string().allow(""),

    isRecurring: Joi.boolean(),

    category: Joi.string().valid(
      "website",
      "automation",
      "ai",
      "ecommerce",
      "maintenance",
      "consulting",
      "saas"
    ).required(),

    isPopular: Joi.boolean(),
    trustBadges: Joi.array().items(Joi.string()),
    ctaText: Joi.string(),
    order: Joi.number(),
  }).required()
});

/* ===== USER SIGNUP ===== */
module.exports.signupSchema = Joi.object({
  name: Joi.string().min(2).required(),
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
