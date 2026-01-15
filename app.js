require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const passport = require("passport");
const LocalStrategy = require("passport-local");

const User = require("./model/user");
const ExpressError = require("./util/ExpressError");

const app = express();

/* ===== DATABASE ===== */
mongoose
  .connect(process.env.MONGO_URL || "mongodb://127.0.0.1:27017/novayz")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

/* ===== VIEW ENGINE ===== */
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/* ===== MIDDLEWARE ===== */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

/* ===== SESSION ===== */
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      touchAfter: 24 * 3600,
    }),
    secret: process.env.SESSION_SECRET || "novayzsecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);
/* ===== PASSPORT ===== */
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

/* ===== ROUTES ===== */
app.use("/", require("./routes/index"));
app.use("/", require("./routes/auth"));
app.use("/", require("./routes/profile"));
app.use("/services", require("./routes/service"));
app.use("/services", require("./routes/review"));
app.use("/", require("./routes/order"));
app.use("/admin", require("./routes/admin"));

/* ===== 404 ===== */
app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});


/* ===== ERROR HANDLER ===== */
app.use((err, req, res, next) => {
  if (err.name === "CastError") {
    err = new ExpressError(400, "Invalid ID");
  }
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("pages/error.ejs", { statusCode, message });
});

/* ===== SERVER ===== */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
