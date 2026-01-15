const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema = new mongoose.Schema(
  {
    /* ===== BASIC INFO ===== */
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      default: "",
    },

    /* ===== VERIFICATION ===== */
    emailVerified: {
      type: Boolean,
      default: false,
    },

    emailVerifyToken: String,

    phoneVerified: {
      type: Boolean,
      default: false,
    },

    phoneOTP: String,
    phoneOTPExpires: Date,

    /* ===== PROFILE ===== */
    profileImage: {
      url: {
        type: String,
        default: "/src/pfp.jpg",
      },
      filename: {
        type: String,
        default: "default-avatar",
      },
    },

    bio: {
      type: String,
      maxLength: 300,
      default: "",
    },

    /* ===== ACCESS ===== */
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

  },

  { timestamps: true }
);

// username + password handled by passport-local-mongoose
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
