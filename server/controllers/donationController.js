const Donation = require("../models/Donation");
const Temple = require("../models/Temple");

// Make Donation
exports.makeDonation = async (req, res) => {
  try {
    const { templeId, amount, message } = req.body;

    if (amount <= 0) {
      return res.status(400).json({ message: "Invalid donation amount" });
    }

    const temple = await Temple.findById(templeId);
    if (!temple) {
      return res.status(404).json({ message: "Temple not found" });
    }

    const donation = await Donation.create({
      user: req.user._id,
      temple: templeId,
      amount,
      message,
    });

    res.status(201).json({
      message: "Donation successful",
      donation,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Donations (Admin)
exports.getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find()
      .populate("user", "name email")
      .populate("temple", "templeName location");

    res.json(donations);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};