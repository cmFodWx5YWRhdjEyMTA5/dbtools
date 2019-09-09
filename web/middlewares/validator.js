const { check } = require("express-validator");

exports.validate = method => {
  switch (method) {
    case "signup": {
      return [
        check("email", "Invalid email").isEmail(),
        check("password", "Password is required").isLength({ min: 5 }),
        check("gender", "Gender is required")
          .not()
          .isEmpty(),
        check("usertype")
          .not()
          .isEmpty()
      ];
    }
    case "login": {
      return [
        check("email", "Invalid email").isEmail(),
        check("password", "Password is required")
          .not()
          .isEmpty()
      ];
    }
    case "project": {
      return [
        check("pname", "Project name is required")
          .not()
          .isEmpty(),
        check("client", "Project end date is required")
          .not()
          .isEmpty(),
        check("start_date", "Project start date is required")
          .not()
          .isEmpty(),
        check("end_date", "Project name is required")
          .not()
          .isEmpty(),
        check("rate_price", "Project rate is required")
          .not()
          .isEmpty(),
        check("rate_duration", "Project rate type is required")
          .not()
          .isEmpty(),
        check("priority", "Project priority is required")
          .not()
          .isEmpty(),
        check("p_leader", "Project leader is required")
          .not()
          .isEmpty(),
        check("p_team", "Project team is required")
          .not()
          .isEmpty(),
        check("p_desc", "Project description is required")
          .not()
          .isEmpty()
      ];
    }
    default: {
      return [];
    }
  }
};
