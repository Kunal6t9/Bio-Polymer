const express = require("express");
const router = express.Router();
const Submission = require("../models/Submission.models.js");
const Polymer = require("../models/polymer.models.js");
const { auth, isAdmin, isContributor } = require("../middleware/auth.middleware.js");

// Get all submissions (admin only)
router.get("/", auth, isAdmin, async (req, res) => {
  try {
    const submissions = await Submission.find()
      .populate("submittedBy", "name email")
      .populate("reviewedBy", "name email")
      .sort({ createdAt: -1 });
    res.json(submissions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get submissions by current user (contributor)
router.get("/my-submissions", auth, isContributor, async (req, res) => {
  try {
    const submissions = await Submission.find({ submittedBy: req.user.id })
      .populate("reviewedBy", "name email")
      .sort({ createdAt: -1 });
    res.json(submissions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get pending submissions (admin only)
router.get("/pending", auth, isAdmin, async (req, res) => {
  try {
    const submissions = await Submission.find({ status: "pending" })
      .populate("submittedBy", "name email")
      .sort({ createdAt: -1 });
    res.json(submissions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Create new submission (contributor or admin)
router.post("/", auth, isContributor, async (req, res) => {
  try {
    const newSubmission = new Submission({
      ...req.body,
      submittedBy: req.user.id,
      status: "pending",
    });

    const submission = await newSubmission.save();
    res.json(submission);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Approve submission (admin only)
router.put("/:id/approve", auth, isAdmin, async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);

    if (!submission) {
      return res.status(404).json({ msg: "Submission not found" });
    }

    // Create polymer from submission
    const newPolymer = new Polymer({
      name: submission.name,
      abbreviation: submission.abbreviation,
      chemicalFormula: submission.chemicalFormula,
      type: submission.type,
      commonUses: submission.commonUses,
      degradationTimes: submission.degradationTimes,
      degradationCoefficients: submission.degradationCoefficients,
      notes: submission.notes,
      imageUrl: submission.imageUrl,
      submittedBy: submission.submittedBy,
      approvedBy: req.user.id,
      status: "approved",
      approvedAt: new Date(),
    });

    const polymer = await newPolymer.save();

    // Update submission
    submission.status = "approved";
    submission.reviewedBy = req.user.id;
    submission.reviewedAt = new Date();
    submission.polymerId = polymer._id;
    submission.reviewNotes = req.body.reviewNotes || "";

    await submission.save();

    res.json({ submission, polymer });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Reject submission (admin only)
router.put("/:id/reject", auth, isAdmin, async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);

    if (!submission) {
      return res.status(404).json({ msg: "Submission not found" });
    }

    submission.status = "rejected";
    submission.reviewedBy = req.user.id;
    submission.reviewedAt = new Date();
    submission.reviewNotes = req.body.reviewNotes || "";

    await submission.save();

    res.json(submission);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Delete submission (admin only)
router.delete("/:id", auth, isAdmin, async (req, res) => {
  try {
    const submission = await Submission.findByIdAndDelete(req.params.id);

    if (!submission) {
      return res.status(404).json({ msg: "Submission not found" });
    }

    res.json({ msg: "Submission deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
