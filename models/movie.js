const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Movie = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    //Duration is in minutes [60]-> 60 minutes
    duration: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      required: true,
    },
    filmCast: { type: [String], default: [] },
  },
  { timestamps: true, collection: "movies" }
);

module.exports = mongoose.model("movies", Movie);
