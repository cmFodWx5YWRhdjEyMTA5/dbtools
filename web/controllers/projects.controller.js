const mongoose = require("mongoose");
const Project = require("../models/projects.models");
const { getProjectList } = require("../helpers/utility");

exports.saveProject = async (req, res, next) => {
  var sess = req.session;
  if (sess.hasOwnProperty("islogin") && sess.islogin == true) {
    if (sess.user.usertype === "admin") {
      try {
        if (req.file) {
          const newProject = new Project({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.pname,
            desc: req.body.p_desc,
            price: req.body.rate_price,
            rate_type: req.body.rate_duration,
            priority: req.body.priority,
            client: req.body.client,
            end_date: req.body.end_date,
            start_date: req.body.start_date,
            platform: req.body.platform,
            team_leader: req.body.p_leader,
            team: req.body.p_team,
            scope: "uploads/projects/" + req.file.filename
          });
          const savedProject = await newProject.save();
          //return res.json(savedProject);
          req.flash("success", "Project saved");
          return res.redirect("/projects");
        } else {
          //res.json({ msg: req.file });
          req.flash("error", req.file);
          res.redirect("/add-project");
        }
      } catch (e) {
        //res.json({ msg: e.message });
        req.flash("error", e.message);
        res.redirect("/add-project");
      }
    } else {
      req.sess.islogin = false;
      req.sess.user = "";
      req.flash("error", "Employee module is in progress..!");
      res.redirect("/login");
    }
  } else {
    req.flash("error", "Session Expired");
    res.redirect("/login");
  }
};

exports.projectsList = async (req, res, next) => {
  var sess = req.session;
  if (sess.hasOwnProperty("islogin") && sess.islogin == true) {
    if (sess.user.usertype === "admin") {
      res.render("admin/projects", {
        title: "admin",
        error: "",
        message: "",
        projects: await getProjectList(),
        user: sess.user
      });
    } else {
      req.sess.islogin = false;
      req.sess.user = "";
      req.flash("error", "Employee module is in progress..!");
      res.redirect("/login");
    }
  } else {
    req.flash("error", "Session Expired");
    res.redirect("/login");
  }
};

exports.addProjectPage = async (req, res, next) => {
  var sess = req.session;
  if (sess.hasOwnProperty("islogin") && sess.islogin == true) {
    if (sess.user.usertype === "admin") {
      res.render("admin/add-project", {
        title: "admin",
        error: "",
        message: "",
        user: sess.user,
        validator: ""
      });
    } else {
      req.sess.islogin = false;
      req.sess.user = "";
      req.flash("error", "Employee module is in progress..!");
      res.redirect("/login");
    }
  } else {
    req.flash("error", "Session Expired");
    res.redirect("/login");
  }
};

exports.editProjectPage = async (req, res, next) => {
  var sess = req.session;
  if (sess.hasOwnProperty("islogin") && sess.islogin == true) {
    if (sess.user.usertype === "admin") {
      res.render("admin/edit-project", {
        title: "admin",
        error: "",
        message: "",
        user: sess.user
      });
    } else {
      req.sess.islogin = false;
      req.sess.user = "";
      req.flash("error", "Employee module is in progress..!");
      res.redirect("/login");
    }
  } else {
    req.flash("error", "Session Expired");
    res.redirect("/login");
  }
};
