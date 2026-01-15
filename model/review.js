const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    service: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
  },
  { timestamps: true }
);

/* prevent duplicate reviews */
reviewSchema.index({ author: 1, service: 1 }, { unique: true });

/* ✅ SAFE CLEANUP — NO CIRCULAR IMPORT */
reviewSchema.post("findOneAndDelete", async function (doc) {
  if (!doc) return;

  const Service = mongoose.model("Service"); // 👈 KEY LINE

  await Service.updateOne(
    { _id: doc.service },
    { $pull: { reviews: doc._id } }
  );
});

module.exports = mongoose.model("Review", reviewSchema);
