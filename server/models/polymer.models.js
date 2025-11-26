const mongoose = require("mongoose");

const PolymerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    abbreviation: {
      type: String,
    },
    type: {
      type: String,
      required: true,
      enum: ["Biodegradable", "Non-Biodegradable"],
    },
    commonUses: {
      type: [String],
    },
    degradationTimes: {
      type: Map,
      of: String,
    },
    notes: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Polymer", PolymerSchema);
