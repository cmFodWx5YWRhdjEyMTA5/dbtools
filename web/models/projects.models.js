const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectsSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, default: null },
  desc: { type: String, required: true },
  price: { type: String, required: true },
  rate_type: { type: String, enum: ["hourly", "fixed"], required: true },
  client: { type: Object, required: true },
  end_date: { type: Date, required: true },
  start_date: { type: Date, required: true },
  platform: { type: Array, required: true },
  scope: { type: String, required: true },
  priority: { type: String, enum: ["high", "low", "medium"], required: true },
  team_leader: { type: Array, required: true },
  team: { type: Array, required: true },
  created_ts: { type: Date, default: Date.now },
  updated_ts: { type: Date, default: null }
});

module.exports = mongoose.model("Projects", projectsSchema);
