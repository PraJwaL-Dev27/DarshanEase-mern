const User = require("../models/User");
const Temple = require("../models/Temple");
const Booking = require("../models/Booking");
const DarshanSlot = require("../models/DarshanSlot");

exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalTemples = await Temple.countDocuments();
    const totalSlots = await DarshanSlot.countDocuments();
    const totalBookings = await Booking.countDocuments();

    const revenueData = await Booking.aggregate([
      { $match: { status: "CONFIRMED" } },
      { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } }
    ]);

    const totalRevenue = revenueData[0]?.totalRevenue || 0;

    res.json({
      totalUsers,
      totalTemples,
      totalSlots,
      totalBookings,
      totalRevenue
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 👥 Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 🏛 Get All Temples
exports.getAllTemples = async (req, res) => {
  try {
    const temples = await Temple.find().populate("organizer", "name email");
    res.json(temples);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 📄 Get All Bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
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