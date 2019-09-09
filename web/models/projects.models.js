const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectsSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, default: null },
  date: { type: Date, required: true },
  desc: { type: String, required: true },
  price: { type: String, required: true },
  deadline: { type: Date, required: true },
  client: { type: Object, required: true },
  start_time: { type: Date, required: true },
  platform: { type: Array, required: true },
  scope: { type: String, required: true },
  created_ts: { type: Date, default: Date.now },
  updated_ts: { type: Date, default: null }
});

module.exports = mongoose.model("Projects", projectsSchema);
