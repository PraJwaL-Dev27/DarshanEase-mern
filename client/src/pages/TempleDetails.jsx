import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Paper,
  TextField,
} from "@mui/material";

import { Rating } from "@mui/material";

function TempleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [slots, setSlots] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // Fetch slots + feedback
  useEffect(() => {
    fetchSlots();
    fetchFeedback();
  }, [id]);

  const fetchSlots = async () => {
    try {
      const res = await api.get(`/slots/${id}`);
      setSlots(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFeedback = async () => {
    try {
      const res = await api.get(`/feedback/${id}`);
      setFeedbacks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitFeedback = async () => {
    if (!rating) {
      alert("Please select rating");
      return;
    }

    try {
      await api.post(
        "/feedback",
        {
          templeId: id,
          rating,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Feedback submitted 🙏");
      setRating(0);
      setComment("");
      fetchFeedback();

    } catch (error) {
      alert(error.response?.data?.message || "Error submitting feedback");
    }
  };

  // Calculate average rating
  const averageRating =
    feedbacks.length > 0
      ? (
          feedbacks.reduce((acc, curr) => acc + curr.rating, 0) /
          feedbacks.length
        ).toFixed(1)
      : 0;

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ py: 10, backgroundColor: "#fdf6ec", minHeight: "100vh" }}>
      <Container maxWidth="md">

        {/* Slots Section */}
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
          Available Darshan Slots
        </Typography>

        {slots.length === 0 ? (
          <Typography textAlign="center">
            No slots available for this temple.
          </Typography>
        ) : (
          slots.map((slot) => (
            <Card
              key={slot._id}
              sx={{
                mb: 3,
                borderRadius: 3,
                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
              }}
            >
              <CardContent>
                <Typography fontWeight={600}>
                  Date:{" "}
                  {new Date(slot.date).toLocaleDateString("en-IN")}
                </Typography>

                <Typography>
                  Time: {slot.startTime} - {slot.endTime}
                </Typography>

                <Typography>
                  Available Seats: {slot.availableSeats}
                </Typography>

                <Typography>
                  Price: ₹{slot.price}
                </Typography>

                <Button
                  variant="contained"
                  sx={{
                    mt: 2,
                    backgroundColor: "#d97706",
                    "&:hover": { backgroundColor: "#b45309" },
                  }}
                  onClick={() => navigate(`/book-slot/${slot._id}`)}
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          ))
        )}

        {/* Feedback Section */}
        <Box sx={{ mt: 10 }}>
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              fontWeight: 700,
              fontFamily: "'Playfair Display', serif",
              color: "#3e2723",
            }}
          >
            Reviews & Ratings ⭐
          </Typography>

          {feedbacks.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Rating value={Number(averageRating)} readOnly precision={0.5} />
              <Typography>
                {averageRating} out of 5 ({feedbacks.length} reviews)
              </Typography>
            </Box>
          )}

          {/* Submit Feedback */}
          {token && (
            <Paper sx={{ p: 3, mb: 4 }}>
              <Typography variant="subtitle1">Your Rating</Typography>

              <Rating
                value={rating}
                onChange={(e, newValue) => setRating(newValue)}
              />

              <TextField
                fullWidth
                multiline
                rows={3}
                margin="normal"
                label="Write your review..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />

              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  backgroundColor: "#d97706",
                  "&:hover": { backgroundColor: "#b45309" },
                }}
                onClick={handleSubmitFeedback}
              >
                Submit Review
              </Button>
            </Paper>
          )}

          {/* Show Reviews */}
          {feedbacks.map((fb) => (
            <Paper key={fb._id} sx={{ p: 3, mb: 2 }}>
              <Typography sx={{ fontWeight: 600 }}>
                {fb.user?.name}
              </Typography>

              <Rating value={fb.rating} readOnly />

              <Typography sx={{ mt: 1 }}>
                {fb.comment}
              </Typography>
            </Paper>
          ))}
        </Box>

      </Container>
    </Box>
  );
}

export default TempleDetails;