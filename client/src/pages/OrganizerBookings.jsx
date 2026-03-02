import { useEffect, useState } from "react";
import api from "../services/api";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Chip,
} from "@mui/material";

function OrganizerBookings() {
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
          sx={{
            mb: 6,
            fontWeight: 700,
            fontFamily: "'Playfair Display', serif",
            color: "#3e2723",
            textAlign: "center",
          }}
        >
          Organizer Bookings Dashboard
        </Typography>

        <Grid container spacing={4}>
          {bookings.map((booking) => (
            <Grid size={{ xs: 12, md: 6 }} key={booking._id}>
              <Card sx={{ borderRadius: 4 }}>
                <CardContent>
                  <Typography fontWeight={600}>
                    👤 {booking.user.name}
                  </Typography>

                  <Typography sx={{ mb: 1 }}>
                    📧 {booking.user.email}
                  </Typography>

                  <Typography>
                    🛕 {booking.slot.temple.templeName}
                  </Typography>

                  <Typography>
                    📍 {booking.slot.temple.location}
                  </Typography>

                  <Typography>
                    📅 {new Date(booking.slot.date).toLocaleDateString("en-GB")}
                  </Typography>

                  <Typography>
                    🕒 {booking.slot.startTime} - {booking.slot.endTime}
                  </Typography>

                  <Typography>
                    🎟 Seats: {booking.numberOfSeats}
                  </Typography>

                  <Typography sx={{ mb: 1 }}>
                    💰 ₹{booking.totalAmount}
                  </Typography>

                  <Chip
                    label={booking.status}
                    color={
                      booking.status === "CONFIRMED"
                        ? "success"
                        : "error"
                    }
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default OrganizerBookings;