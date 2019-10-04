const mongoose = require("mongoose");
import gratSchema from require("./grat.model");
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
  gender: {
    type: String,
    required: true
  }
  gratitudes: [gratSchema]

});

module.exports.User = mongoose.model("User", userSchema);
