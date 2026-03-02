const express = require("express");
const router = express.Router();

const { makeDonation, getAllDonations } = require("../controllers/donationController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// User donates
router.post("/", protect, makeDonation);

// Admin views all donations
router.get("/", protect, authorizeRoles("ADMIN"), getAllDonations);

module.exports = router;