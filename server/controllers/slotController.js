const DarshanSlot = require("../models/DarshanSlot");
const Temple = require("../models/Temple");

// Create Slot (Organizer Only)
exports.createSlot = async (req, res) => {
  try {
    const { templeId, date, startTime, endTime, availableSeats, price } = req.body;

    const temple = await Temple.findById(templeId);
    if (!temple) {
      return res.status(404).json({ message: "Temple not found" });
    }

    const slot = await DarshanSlot.create({
      temple: templeId,
      date,
      startTime,
      endTime,
      availableSeats,
      price,
    });

    res.status(201).json({
      message: "Slot created successfully",
      slot,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Slots by Temple
exports.getSlotsByTemple = async (req, res) => {
  try {
    const slots = await DarshanSlot.find({ temple: req.params.templeId })
  .populate("temple", "templeName location");

    res.json(slots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Slot (Organizer Only)
exports.updateSlot = async (req, res) => {
  try {
    const slot = await DarshanSlot.findById(req.params.id).populate("temple");

    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }

    // Only organizer who owns temple can update
    if (slot.temple.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedSlot = await DarshanSlot.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedSlot);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Slot (Organizer Only)
exports.deleteSlot = async (req, res) => {
  try {
    const slot = await DarshanSlot.findById(req.params.id).populate("temple");

    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }

    if (slot.temple.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await slot.deleteOne();

    res.json({ message: "Slot deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};