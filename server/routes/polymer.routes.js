const express = require("express");
const router = express.Router();
const Polymer = require("../models/polymer.models.js");

router.get("/", async (req, res) => {
  try {
    const polymers = await Polymer.find();
    res.json(polymers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const polymer = await Polymer.findById(req.params.id);
    if (!polymer) {
      return res.status(404).json({ msg: "Polymer not found" });
    }
    res.json(polymer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/", async (req, res) => {
  try {
    const newPolymer = new Polymer({
      name: req.body.name,
      abbreviation: req.body.abbreviation,
      type: req.body.type,
      commonUses: req.body.commonUses,
      degradationTimes: req.body.degradationTimes,
      notes: req.body.notes,
      imageUrl: req.body.imageUrl,
    });

    const polymer = await newPolymer.save();
    res.json(polymer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const polymer = await Polymer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!polymer) {
      return res.status(404).json({ msg: "Polymer not found" });
    }

    res.json(polymer);
  } catch (err) {
    console.error(err.message);
    if (err.name === "ValidationError") {
      return res
        .status(400)
        .json({ msg: "Validation Error", errors: err.errors });
    }
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const polymer = await Polymer.findByIdAndDelete(req.params.id);

    if (!polymer) {
      return res.status(404).json({ msg: "Polymer not found" });
    }

    res.json({ msg: "Polymer removed successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/compare", async (req, res) => {
  try {
    const { ids } = req.body;
    
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ msg: "Please provide an array of polymer IDs" });
    }

    const polymers = await Polymer.find({ _id: { $in: ids } });
    
    if (polymers.length === 0) {
      return res.status(404).json({ msg: "No polymers found with the provided IDs" });
    }

    res.json(polymers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
