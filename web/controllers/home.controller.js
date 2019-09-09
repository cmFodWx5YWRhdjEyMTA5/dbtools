const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtKey = process.env.JWT_KEY;

exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    var response = { errors: [] };
    let err_msgs = { ...errors };
    err_msgs.errors.forEach(async err => {
      response.errors.push(err.msg);
    });
    res.statusCode = 400;
    return res.json(response);
  }
  try {
    const dbuser = await User.find({ email: req.body.email });
    if (dbuser.length > 0) {
      return res.status(409).json({
        message: "Email ID is already registered with us. "
      });
    }
    const hasedpass = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      email: req.body.email,
      password: hasedpass,
      gender: req.body.gender,
      usertype: req.body.usertype
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (e) {
    res.status(500).json(e.message);
  }
};

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    var response = { errors: [] };
    let err_msgs = { ...errors };
    err_msgs.errors.forEach(async err => {
      response.errors.push(err.msg);
    });
    return res.render("login", {
      title: "login",
      validation: [...response.errors],
      error: "",
      message: ""
    });
  }
  try {
    const dbuser = await User.find({ email: req.body.email });
    if (dbuser.length < 1) {
      req.flash("error", "Email not exists");
      return res.redirect("/login");
    }
    const user = { ...dbuser[0]._doc };
    const cmp_pass = await bcrypt.compare(req.body.password, user.password);
    if (!cmp_pass) {
      req.flash("error", "Password not correct");
      return res.redirect("/login");
    }
    if (cmp_pass) {
      const token = jwt.sign(
        {
          email: user.email,
          userId: user._id
        },
        jwtKey,
        {
          expiresIn: "12h"
        }
      );
      var sess = req.session;
      sess.token = token;
      sess.user = user;
      sess.islogin = true;
      return res.redirect("/");
    }
    req.flash("error", "Auth Failed");
    res.redirect("/login");
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/login");
  }
};
