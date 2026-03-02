const Temple = require("../models/Temple");

// Create Temple (Organizer Only)
exports.createTemple = async (req, res) => {
  try {
    const { templeName, location, darshanStartTime, darshanEndTime, description } = req.body;

    const temple = await Temple.create({
      templeName,
      location,
      darshanStartTime,
      darshanEndTime,
      description,
      organizer: req.user._id,
    });

    res.status(201).json({
      message: "Temple created successfully",
      temple,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Temples (Public)
exports.getAllTemples = async (req, res) => {
  try {
    const temples = await Temple.find().populate("organizer", "name email");

    res.json(temples);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Organizer's Temples
exports.getMyTemples = async (req, res) => {
  try {
    const temples = await Temple.find({ organizer: req.user._id });
    res.json(temples);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Temple (Organizer Only)
exports.updateTemple = async (req, res) => {
  try {
    const temple = await Temple.findById(req.params.id);

    if (!temple) {
      return res.status(404).json({ message: "Temple not found" });
    }

    // Only organizer who created it can update
    if (temple.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedTemple = await Temple.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedTemple);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Temple (Organizer Only)
exports.deleteTemple = async (req, res) => {
  try {
    const temple = await Temple.findById(req.params.id);

    if (!temple) {
      return res.status(404).json({ message: "Temple not found" });
    }

    if (temple.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await temple.deleteOne();

    res.json({ message: "Temple deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};