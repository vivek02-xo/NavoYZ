const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    service: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },

    customer: {
      name: String,
      email: String,
      phone: String,
    },

    requirements: {
      type: String,
      required: true,
    },

    budget: Number,
    timeline: String,

    status: {
        type: String,
        enum: ["pending", "in-progress", "delivered", "cancelled"],
        default: "pending",
    },
    
    statusHistory: [{
        status: String,
        changedAt: {
            type: Date,
            default: Date.now,
        }}
    ],


    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid"],
      default: "unpaid",
    },

    adminNotes: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
