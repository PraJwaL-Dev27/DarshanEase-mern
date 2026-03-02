const express = require("express");
const router = express.Router();

const {
  bookSlot,
  getMyBookings,
  cancelBooking,
  getBookingsForMyTemples
} = require("../controllers/bookingController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// User books slot
router.post("/", protect, bookSlot);

// User views own bookings
router.get("/my", protect, getMyBookings);

router.put("/cancel/:id", protect, cancelBooking);

// Organizer view bookings
router.get(
  "/organizer",
  protect,
  authorizeRoles("ORGANIZER"),
  getBookingsForMyTemples
);

module.exports = router;