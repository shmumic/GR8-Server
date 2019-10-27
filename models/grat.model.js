const mongoose = require("mongoose");
module.exports.gratSchema = new mongoose.Schema({ //grat stands for gratitude

  gratText: { //the actual gratitude
    type: String, //validate length
    minlength: 2,
    maxlength: 280 //just like nowdays twitter
  },

    rating: {//user ratings a gratitude with a low rating will be removed.
    type: Number
    },
    //is the gratitude for the the eyes of everyone to see
  isPublic: {
    type: Boolean,
    required: true
  },
    canVisibilityBeChanged: { //after experiation date the user cannot change the visiblity to public.
        type: Boolean,
        required: true
    },
  published: {
    type: Boolean
  },
    userId: String,//links to the author
    ip: String,
    userAgent: JSON,
    location: { //GeoJson
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
        },
        coordinates: {
            type: [Number],
        }
    },
    publishedDate: Date,
    expireDate: Date,
  hashtags: {
    type: String
  },
  categories: {
    type: String
  }

});

module.exports.Grat = mongoose.model("Grat", this.gratSchema);
