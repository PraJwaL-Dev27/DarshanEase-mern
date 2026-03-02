import { useEffect, useState } from "react";
import api from "../services/api";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  CircularProgress,
} from "@mui/material";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchBookings = async () => {
    try {
      const res = await api.get("/bookings/my", {
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
    if (token) {
      fetchBookings();
    }
  }, []);

  const handleCancel = async (id) => {
    try {
      await api.put(`/bookings/cancel/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Booking Cancelled");
      fetchBookings();
    } catch (error) {
      alert(error.response?.data?.message || "Cancel failed");
    }
  };

  if (!token) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <Typography>Please login to view bookings.</Typography>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }
  const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

  return (
    <Box sx={{ py: 10, backgroundColor: "#fdf6ec", minHeight: "100vh" }}>
      <Container maxWidth="md">
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
              width: "70px",
              height: "4px",
              backgroundColor: "#d97706",
              margin: "12px auto 0",
              borderRadius: "4px",
            },
          }}
        >
          My Bookings
        </Typography>

        {bookings.length === 0 ? (
          <Typography textAlign="center">
            No bookings found.
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
                <Typography fontWeight={600}>
                  Temple: {booking.slot?.temple?.templeName || "N/A"}
                </Typography>
                <Typography>
  Devotee Name: {booking.devoteeName}
</Typography>

<Typography>
  Mobile: {booking.mobile}
</Typography>

                <Typography>
                 Date: {formatDate(booking.slot?.date)}
                </Typography>

                <Typography>
                  Time: {booking.slot?.startTime} - {booking.slot?.endTime}
                </Typography>

                <Typography>
                  Seats: {booking.numberOfSeats}
                </Typography>

                <Typography>
                  Total: ₹{booking.totalAmount}
                </Typography>

                <Typography
                  sx={{
                    mt: 1,
                    color:
                      booking.status === "CONFIRMED"
                        ? "green"
                        : "red",
                    fontWeight: 600,
                  }}
                >
                  Status: {booking.status}
                </Typography>

                {booking.status === "CONFIRMED" && (
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ mt: 2 }}
                    onClick={() => handleCancel(booking._id)}
                  >
                    Cancel Booking
                  </Button>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </Container>
    </Box>
  );
}

export default MyBookings;