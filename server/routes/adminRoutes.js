const express = require("express");
const router = express.Router();

const {
  getDashboardStats,
  getAllUsers,
  getAllTemples,
  getAllBookings
} = require("../controllers/adminController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

router.get("/dashboard", protect, authorizeRoles("ADMIN"), getDashboardStats);
router.get("/users", protect, authorizeRoles("ADMIN"), getAllUsers);
router.get("/temples", protect, authorizeRoles("ADMIN"), getAllTemples);
router.get("/bookings", protect, authorizeRoles("ADMIN"), getAllBookings);

module.exports = router;