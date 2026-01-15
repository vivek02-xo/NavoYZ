const { serviceSchema, signupSchema } = require("../schemas");
const ExpressError = require("../util/ExpressError");

module.exports.validateService = (req, res, next) => {
  const { error } = serviceSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const msg = error.details.map(el => el.message).join(", ");
    throw new ExpressError(400, msg);
  }
  next();
};

module.exports.validateSignup = (req, res, next) => {
  const { error } = signupSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const msg = error.details.map(el => el.message).join(", ");
    throw new ExpressError(400, msg);
  }
  next();
};
