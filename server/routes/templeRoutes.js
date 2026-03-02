const express = require("express");
const router = express.Router();

const { createTemple, getAllTemples } = require("../controllers/templeController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

const { getMyTemples } = require("../controllers/templeController");

router.get("/my", protect, authorizeRoles("ORGANIZER"), getMyTemples);
// Public
router.get("/", getAllTemples);

// Organizer Only
router.post("/", protect, authorizeRoles("ORGANIZER"), createTemple);

const { updateTemple, deleteTemple } = require("../controllers/templeController");

router.put("/:id", protect, authorizeRoles("ORGANIZER"), updateTemple);
router.delete("/:id", protect, authorizeRoles("ORGANIZER"), deleteTemple);

module.exports = router;