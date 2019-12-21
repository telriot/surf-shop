require("dotenv").config()

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const User = require("./models/user");
const passport = require("passport");
const mongoose = require("mongoose");
const logger = require("morgan");
const methodOverride = require("method-override");

// Require routes
const indexRouter = require("./routes/index");
const postsRouter = require("./routes/posts");
const reviewsRouter = require("./routes/reviews");

const app = express();

// connect to the db, fix deprecations
mongoose.connect("mongodb://localhost:27017/surf-shop-mapbox", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// setup public assets directory

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'));


// Configure sessions
app.use(
  session({
    secret: "funny bananas",
    resave: false,
    saveUninitialized: true
  })
);

// Configure passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Mount Routes
app.use("/", indexRouter);
app.use("/posts", postsRouter);
app.use("/posts/:id/reviews", reviewsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
