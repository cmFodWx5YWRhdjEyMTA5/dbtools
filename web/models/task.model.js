const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  project: { type: Schema.Types.ObjectId, ref: "Projects" },
  title:{type:String,required: true },
  desc:{type:String,required: true },
  assigned_to:{ type: Schema.Types.ObjectId, ref: "User" },
  assigned_time:{type:Date,required: true },
  completion_time:{type:Date,required: true },
  status: {
    type: String,
    enum: ["open", "complete", "suspended"],
    required: true,
    default: "open"
  },
  deadline:{type:Date,required: true },
  created_ts: { type: Date, default: Date.now },
  updated_ts: { type: Date, default: null }
});

module.exports = mongoose.model("Task", taskSchema);
