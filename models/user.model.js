const mongoose = require("mongoose");
const grat = require("./grat.model");

const findOrCreate = require("mongoose-findorcreate");

const userSchema = new mongoose.Schema({
    nickName: {
    type: String,
        minlength: 3,
    maxlength: 50
  },
    role: String,
  googleId: String,
  facebookId: String,

  age: {
    type: Number,
    min: 1,
    max: 130
  },
  gender: {
    type: String,
  },
  gratitudes: [grat.gratSchema]

}, {strict: true});
userSchema.plugin(findOrCreate);

module.exports.User = mongoose.model("User", userSchema);
