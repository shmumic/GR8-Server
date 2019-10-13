const mongoose = require("mongoose");
const grat = require("./grat.model");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  authMethod: { ///TBD
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  googleId: String,
  facebookId: String,

  age: {
    type: Number,
    min: 1,
    max: 130
  },
  gender: {
    type: String,
    required: true
  },
  gratitudes: [grat.gratSchema]

}, {strict: true});

module.exports.User = mongoose.model("User", userSchema);
