const moment = require("moment");
const { getProjectList } = require("../helpers/utility");

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

exports.saveProject = async (req, res, next) => {
  var sess = req.session;
  if (sess.hasOwnProperty("islogin") && sess.islogin == true) {
    if (sess.user.usertype === "admin") {
      console.log("req.body");
      console.log(req.body);
      res.json({
        data: req.body,
        startdat: moment(req.body.start_date).format(),
        end: moment(req.body.start_date).format()
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
