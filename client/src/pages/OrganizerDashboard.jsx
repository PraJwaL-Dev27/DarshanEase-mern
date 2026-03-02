import { useEffect, useState } from "react";
import api from "../services/api";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Chip,
} from "@mui/material";

function OrganizerDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchBookings = async () => {
    try {
      const res = await api.get("/bookings/organizer", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookings(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ py: 10, backgroundColor: "#fdf6ec", minHeight: "100vh" }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          textAlign="center"
          sx={{
            fontWeight: 700,
            mb: 6,
            fontFamily: "'Playfair Display', serif",
            color: "#3e2723",
            position: "relative",
            "&::after": {
              content: '""',
              display: "block",
              width: "80px",
              height: "4px",
              backgroundColor: "#d97706",
              margin: "14px auto 0",
              borderRadius: "4px",
            },
          }}
        >
          Organizer Dashboard
        </Typography>

        {bookings.length === 0 ? (
          <Typography textAlign="center">
            No bookings for your temples yet.
          </Typography>
        ) : (
          bookings.map((booking) => (
            <Card
              key={booking._id}
              sx={{
                mb: 3,
                borderRadius: 3,
                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
              }}
            >
              <CardContent>
                <Typography fontWeight={700}>
                  Temple: {booking.slot?.temple?.templeName}
                </Typography>

                <Typography>
                  Location: {booking.slot?.temple?.location}
                </Typography>

                <Typography>
                  Date: {booking.slot?.date}
                </Typography>

                <Typography>
                  Time: {booking.slot?.startTime} -{" "}
                  {booking.slot?.endTime}
                </Typography>

                <Typography>
                  Devotee: {booking.user?.name} (
                  {booking.user?.email})
                </Typography>

                <Typography>
                  Seats Booked: {booking.numberOfSeats}
                </Typography>

                <Typography>
                  Amount: ₹{booking.totalAmount}
                </Typography>

                <Chip
                  label={booking.status}
                  color={
                    booking.status === "CONFIRMED"
                      ? "success"
                      : "error"
                  }
                  sx={{ mt: 1 }}
                />
              </CardContent>
            </Card>
          ))
        )}
      </Container>
    </Box>
  );
}

export default OrganizerDashboard;