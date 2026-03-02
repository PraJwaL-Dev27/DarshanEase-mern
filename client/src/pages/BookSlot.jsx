import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";

function BookSlot() {
  const { slotId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [slot, setSlot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [devoteeName, setDevoteeName] = useState("");
  const [mobile, setMobile] = useState("");
  const [seats, setSeats] = useState(1);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchSlot = async () => {
      try {
        const res = await api.get(`/slots/single/${slotId}`);
        setSlot(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSlot();
  }, [slotId]);

  const handleBooking = async () => {
    if (!devoteeName || !mobile || seats <= 0) {
      alert("Please fill all fields correctly.");
      return;
    }

    try {
      await api.post(
  "/bookings",
  {
    slotId: slot._id,
    numberOfSeats: seats,
    devoteeName,
    mobile,
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      alert("Booking Successful 🎉");
      navigate("/my-bookings");
    } catch (error) {
      alert(error.response?.data?.message || "Booking failed");
    }
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ py: 10, backgroundColor: "#fdf6ec", minHeight: "100vh" }}>
      <Container maxWidth="sm">
        <Typography
          variant="h4"
          textAlign="center"
          sx={{
            fontWeight: 700,
            mb: 6,
            fontFamily: "'Playfair Display', serif",
            color: "#3e2723",
          }}
        >
          Book Darshan Slot
        </Typography>

        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography fontWeight={600}>
              Date: {slot.date}
            </Typography>

            <Typography>
              Time: {slot.startTime} - {slot.endTime}
            </Typography>

            <Typography>
              Price per Seat: ₹{slot.price}
            </Typography>

            <Typography sx={{ mb: 3 }}>
              Available Seats: {slot.availableSeats}
            </Typography>

            <TextField
              fullWidth
              label="Devotee Name"
              margin="normal"
              value={devoteeName}
              onChange={(e) => setDevoteeName(e.target.value)}
            />

            <TextField
              fullWidth
              label="Mobile Number"
              margin="normal"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />

            <TextField
              fullWidth
              type="number"
              label="Number of Seats"
              margin="normal"
              value={seats}
              onChange={(e) => setSeats(Number(e.target.value))}
            />

            <Typography sx={{ mt: 2, fontWeight: 600 }}>
              Total: ₹{slot.price * seats}
            </Typography>

            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                backgroundColor: "#d97706",
                "&:hover": { backgroundColor: "#b45309" },
              }}
              onClick={handleBooking}
            >
              Confirm Booking
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default BookSlot;