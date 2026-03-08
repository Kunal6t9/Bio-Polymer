const mongoose = require("mongoose");

const SubmissionSchema = new mongoose.Schema(
  {
    // Polymer data submitted by contributor
    name: {
      type: String,
      required: true,
    },
    abbreviation: {
      type: String,
    },
    chemicalFormula: {
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
    degradationCoefficients: {
      baseRate: { type: Number, default: 1.0 },
      temperatureFactor: { type: Number, default: 0.05 },
      phFactor: { type: Number, default: 0.03 },
      moistureFactor: { type: Number, default: 0.04 },
    },
    notes: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    // Submission metadata
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    reviewNotes: {
      type: String,
    },
    reviewedAt: {
      type: Date,
    },
    // If approved, reference to created polymer
    polymerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Polymer",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Submission", SubmissionSchema);
