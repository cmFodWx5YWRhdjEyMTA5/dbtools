const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const session = require("express-session");
const path = require("path");
const flash = require("express-flash-messages");

dotenv.config();
const config = require("./web/configs/database.js");

app.use(express.static(path.join(__dirname, "public")));
app.use("/public", express.static(path.join(__dirname, "/public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(flash());
app.use(
  session({
    secret: process.env.DBTOOLS_SECRET,
    resave: true,
    saveUninitialized: true
  })
);

//Database Connections Starts
mongoose.connect(config.database, {
  useCreateIndex: true,
  useNewUrlParser: true
});
let db = mongoose.connection;
db.once("open", () => console.log("Connected to MongoDB"));
db.on("disconnected", () => console.log("Disonnected to MongoDB"));
db.on("reconnected", () => console.log("Reconnected to MongoDB"));
db.on("error", err => console.log(err));
//Database Connections Ends

//WEB ROUTES STARTS
const webRoutes = require("./web/routes/home.route");
app.use("/", webRoutes);
//WEB ROUTES ENDS

app.get("/logout", (req, res, next) => {
  req.session.islogin = false;
  req.session.user = "";
  res.redirect("/");
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json(error.message);
});

module.exports = app;
