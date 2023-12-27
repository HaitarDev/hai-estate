const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "this field is required"],
  },
  description: {
    type: String,
    required: [true, "this field is required"],
  },
  address: {
    type: String,
    required: [true, "this field is required"],
  },
  type: {
    type: String,
    enum: ["rent", "sell"],
    required: [true, "this field is required"],
  },

  parking: {
    type: Boolean,
    required: [true, "this field is required"],
    default: false,
  },
  furnished: {
    type: Boolean,
    required: [true, "this field is required"],
    default: false,
  },
  offer: {
    type: Boolean,
    required: [true, "this field is required"],
    default: false,
  },
  beds: {
    type: Number,
    min: 1,
    max: 12,
    required: [true, "this field is required"],
  },
  baths: {
    type: Number,
    min: 0,
    required: [true, "this field is required"],
  },
  regularPrice: {
    type: Number,
    required: [true, "this field is required"],
    min: 10,
  },
  images: {
    type: [String],
    required: [true, "this field is required"],
  },
  userRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
