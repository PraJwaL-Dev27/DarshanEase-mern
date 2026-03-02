const express = require("express");
const router = express.Router();

const { submitFeedback, getTempleFeedback } = require("../controllers/feedbackController");
const { protect } = require("../middleware/authMiddleware");

// User submits feedback
router.post("/", protect, submitFeedback);

// Get feedback of a temple
router.get("/:templeId", getTempleFeedback);

const { getAllFeedback, deleteFeedback } = require("../controllers/feedbackController");
const { authorizeRoles } = require("../middleware/authMiddleware");

// Admin view all feedback
router.get("/admin/all", protect, authorizeRoles("ADMIN"), getAllFeedback);

// Admin delete feedback
router.delete("/admin/:id", protect, authorizeRoles("ADMIN"), deleteFeedback);

module.exports = router;