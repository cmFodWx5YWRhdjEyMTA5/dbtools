const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, default: null },
  usertype: {
    type: String,
    enum: ["admin", "employee"],
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: { type: String, required: true },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
    default: "other"
  },
  phone: { type: String, default: null },
  otp: { type: String, default: null },
  about: { type: Array, default: null },
  profilepic: { type: String, default: "assets/img/user.jpg" },
  isProfileSet: { type: Boolean, default: false },
  created_ts: { type: Date, default: Date.now },
  updated_ts: { type: Date, default: null }
});

module.exports = mongoose.model("User", userSchema);
