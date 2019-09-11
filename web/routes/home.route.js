const router = require("express").Router();
const { validate } = require("../middlewares/validator");
const {
  projectsListPage,
  editProjectPage,
  saveProject,
  addProjectPage
} = require("../controllers/projects.controller");
const { registerUser, login } = require("../controllers/home.controller");

router.get("/", async (req, res) => {
  var sess = req.session;
  if (sess.hasOwnProperty("islogin") && sess.islogin == true) {
    if (sess.user.usertype === "admin") {
      res.render("admin/dashboard", {
        title: "user",
        error: "",
        message: "",
        user: sess.user
      });
    }
  } else {
    req.flash("error", "Session Expired");
    res.redirect("/login");
  }
});
router.get("/login", async (req, res) => {
  res.render("login", {
    title: "login",
    error: "",
    validation: [],
    message: ""
  });
});
router.get("/signup", async (req, res) => {
  res.render("signup", {
    title: "signup",
    error: "",
    validation: [],
    message: ""
  });
});
router.get("/forgot-password", async (req, res) => {
  res.render("forgot-password", {
    title: "forgot-password",
    error: "",
    message: ""
  });
});

const { projectFileUpload } = require("../middlewares/project-files-upload");

router.get("/projects", projectsListPage);
router.get("/edit-project", editProjectPage);
router.get("/add-project", addProjectPage);

router.post("/register", validate("signup"), registerUser);
router.post("/login", validate("login"), login);
router.post(
  "/projects",
  projectFileUpload.single("p_file"),
  validate("project"),
  saveProject
);

const { getProjectList } = require("../helpers/utility");
router.get("/test", async (req, res) => {
  const { projects } = await getProjectList();
  console.log(projects);
  res.json({
    title: "admin",
    error: "",
    message: "",
    projects: projects
  });
});

module.exports = router;
