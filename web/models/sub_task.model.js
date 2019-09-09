const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subTaskSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  task: { type: Schema.Types.ObjectId, ref: "Task" },
  title:{type:String,required: true },
  desc:{type:String,required: true },
  deadline:{type:Date,required: true },
  created_ts: { type: Date, default: Date.now },
  updated_ts: { type: Date, default: null }
});

module.exports = mongoose.model("Sub_task", subTaskSchema);
