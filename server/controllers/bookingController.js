const Booking = require("../models/Booking");
const DarshanSlot = require("../models/DarshanSlot");

// Book Slot
exports.bookSlot = async (req, res) => {
  try {
    const { slotId, numberOfSeats, devoteeName, mobile } = req.body;

    const slot = await DarshanSlot.findById(slotId);

    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }

    if (slot.availableSeats < numberOfSeats) {
      return res.status(400).json({ message: "Not enough seats available" });
    }

    const totalAmount = slot.price * numberOfSeats;

    const booking = await Booking.create({
  user: req.user._id,
  slot: slotId,
  devoteeName,
  mobile,
  numberOfSeats,
  totalAmount,
});

    // Reduce available seats
    slot.availableSeats -= numberOfSeats;
    await slot.save();

    res.status(201).json({
      message: "Booking successful",
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get My Bookings
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate({
        path: "slot",
        populate: {
          path: "temple",
          select: "templeName location"
        }
      })
      .populate("user", "name email");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cancel Booking
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("slot");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to cancel this booking" });
    }

    if (booking.status === "CANCELLED") {
      return res.status(400).json({ message: "Booking already cancelled" });
    }

    // Restore seats
    const slot = await DarshanSlot.findById(booking.slot._id);
    slot.availableSeats += booking.numberOfSeats;
    await slot.save();

    booking.status = "CANCELLED";
    await booking.save();

    res.json({ message: "Booking cancelled successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const Temple = require("../models/Temple"); // add this at top if missing

// Organizer: Get bookings for temples created by this organizer
exports.getBookingsForMyTemples = async (req, res) => {
  try {
    // 1️⃣ Get temples created by this organizer
    const temples = await Temple.find({ organizer: req.user._id });

    const templeIds = temples.map(t => t._id);

    // 2️⃣ Get slots of those temples
    const slots = await DarshanSlot.find({ temple: { $in: templeIds } });

    const slotIds = slots.map(s => s._id);

    // 3️⃣ Get bookings for those slots
    const bookings = await Booking.find({ slot: { $in: slotIds } })
      .populate("user", "name email")
      .populate({
        path: "slot",
        populate: {
          path: "temple",
          select: "templeName location"
        }
      });

    res.json(bookings);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};