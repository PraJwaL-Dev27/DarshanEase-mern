const dns = require('dns').promises;   // or just require('dns') in older Node
dns.setServers(['8.8.8.8', '1.1.1.1']);   // to fix DNS refused block error

require("dotenv").config({ path: "./.env" });

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const connectDB = require("./config/db");

const app = express();

// Connect Database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

const templeRoutes = require("./routes/templeRoutes");

app.use("/api/temples", templeRoutes);

const slotRoutes = require("./routes/slotRoutes");

app.use("/api/slots", slotRoutes);

const bookingRoutes = require("./routes/bookingRoutes");

app.use("/api/bookings", bookingRoutes);

const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);

const donationRoutes = require("./routes/donationRoutes");
app.use("/api/donations", donationRoutes);

const feedbackRoutes = require("./routes/feedbackRoutes");
app.use("/api/feedback", feedbackRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("DarshanEase API is running...");
});

const { protect, authorizeRoles } = require("./middleware/authMiddleware");

app.get("/api/test", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
}); 