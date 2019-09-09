const Projects = require("../models/projects.models");

exports.getProjectList = async () => {
  try {
    const data = await Projects.find();
    return {
      projects: [...data],
      count: data.length
    };
  } catch (e) {
    return {
      msg: "error",
      err: e.message
    };
  }
};
