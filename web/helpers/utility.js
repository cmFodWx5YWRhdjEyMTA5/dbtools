const Projects = require("../models/projects.models");
const moment = require("moment");

exports.getProjectList = async () => {
  try {
    const data = await Projects.find();
    return {
      projects: await Promise.all(
        data.map(async project => {
          return {
            ...project._doc,
            name: project.name,
            platform: project.platform,
            team_leader: project.team_leader,
            team: project.team,
            _id: project._id,
            desc: project.desc,
            price: project.price,
            rate_type: project.rate_type,
            priority: project.priority,
            client: project.client,
            end_date: moment(project.end_date).format("D MMM YYYY"),
            start_date: moment(project.start_date).format("D MMM YYYY"),
            scope: project.scope,
            created_ts: project.created_ts
          };
        })
      ),
      count: data.length
    };
  } catch (e) {
    return {
      msg: "error",
      err: e.message
    };
  }
};
