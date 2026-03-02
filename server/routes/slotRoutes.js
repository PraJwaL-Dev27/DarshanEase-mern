const express = require("express");
const router = express.Router();

const { createSlot, getSlotsByTemple } = require("../controllers/slotController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const { updateSlot, deleteSlot } = require("../controllers/slotController");
const DarshanSlot = require("../models/DarshanSlot");

// Organizer creates slot
router.post("/", protect, authorizeRoles("ORGANIZER"), createSlot);

// Public view slots by temple
router.get("/:templeId", getSlotsByTemple);
router.get("/single/:id", async (req, res) => {
  const slot = await DarshanSlot.findById(req.params.id);
  if (!slot) return res.status(404).json({ message: "Slot not found" });
  res.json(slot);
});

router.put("/:id", protect, authorizeRoles("ORGANIZER"), updateSlot);
router.delete("/:id", protect, authorizeRoles("ORGANIZER"), deleteSlot);

module.exports = router;