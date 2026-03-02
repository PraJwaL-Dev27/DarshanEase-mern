const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    
    devoteeName: {
  type: String,
  required: true,
},

mobile: {
  type: String,
  required: true,
},

    slot: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DarshanSlot",
      required: true,
    },

    numberOfSeats: {
      type: Number,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["CONFIRMED", "CANCELLED"],
      default: "CONFIRMED",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);