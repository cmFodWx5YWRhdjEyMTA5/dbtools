const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskCommentsSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  task: { type: Schema.Types.ObjectId, ref: "Task" },
  file:{type:String,required: true },
  comment:{type:String,required: true },
  time:{type:Date,required: true },
  user:{ type: Schema.Types.ObjectId, ref: "User" },
  created_ts: { type: Date, default: Date.now },
  updated_ts: { type: Date, default: null }
});

module.exports = mongoose.model("Task_comments", taskCommentsSchema);
