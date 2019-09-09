const dotenv = require("dotenv");
dotenv.config();
module.exports = { database: process.env.DBTOOLS_DB_CONNECT };
