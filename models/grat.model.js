const mongoose = require("mongoose");
const gratSchema = new mongoose.Schema({ //grat stands for gratitude

  gratText: { //the actual gratitude
    type: String, //validate length
    minlength: 2,
    maxlength: 280 //just like nowdays twitter
  },

  rating: {
    type: Number
  }, //user ratings a gratitude with a low rating will be removed.
  isPublic: {
    type: Boolean,
    required: true
  }, //is the gratitude for the the eyes of everyone to see
  published: {
    type: Boolean
  },
    userId: String,//links to the author
    source: {
    ip:String,
    browser: String,
    location: { //GeoJson
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ['Point'], // 'location.type' must be 'Point'
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    }
  },
  date: {

  },
  expiretionDate: {},
  hashtags: {
    type: String
  },
  categories: {
    type: String
  }

});
module.exports.Grat = mongoose.model("Grat", gratSchema);
module.exports.gratSchema = gratSchema;
