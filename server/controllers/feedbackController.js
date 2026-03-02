const Feedback = require("../models/Feedback");
const Temple = require("../models/Temple");

// Submit Feedback
exports.submitFeedback = async (req, res) => {
  try {
    const { templeId, rating, comment } = req.body;

    const temple = await Temple.findById(templeId);
    if (!temple) {
      return res.status(404).json({ message: "Temple not found" });
    }

    // Optional: prevent duplicate feedback by same user
    const existing = await Feedback.findOne({
      user: req.user._id,
      temple: templeId,
    });

    if (existing) {
      return res.status(400).json({ message: "You already submitted feedback" });
    }

    const feedback = await Feedback.create({
      user: req.user._id,
      temple: templeId,
      rating,
      comment,
    });

    res.status(201).json({
      message: "Feedback submitted successfully",
      feedback,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Feedback of a Temple
exports.getTempleFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({
      temple: req.params.templeId,
    })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.json(feedbacks);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Admin: Get all feedback
exports.getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate("user", "name email")
      .populate("temple", "templeName location")
      .sort({ createdAt: -1 });

    res.json(feedbacks);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Delete feedback
exports.deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    await feedback.deleteOne();

    res.json({ message: "Feedback deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};