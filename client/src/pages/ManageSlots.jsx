import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

function ManageSlots() {
  const { templeId } = useParams();
  const token = localStorage.getItem("token");

  const [slots, setSlots] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    startTime: "",
    endTime: "",
    availableSeats: "",
    price: "",
  });

  const fetchSlots = async () => {
    const res = await api.get(`/slots/${templeId}`);
    setSlots(res.data);
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      await api.post(
  "/slots",
  { ...formData, templeId: templeId },   // <-- CHANGE HERE
  { headers: { Authorization: `Bearer ${token}` } }
);

      fetchSlots();
      setFormData({
        date: "",
        startTime: "",
        endTime: "",
        availableSeats: "",
        price: "",
      });
    } catch (error) {
      alert("Slot creation failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this slot?")) return;

    await api.delete(`/slots/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchSlots();
  };

  return (
    <Box sx={{ py: 10, backgroundColor: "#fdf6ec", minHeight: "100vh" }}>
      <Container maxWidth="md">
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            fontWeight: 700,
            fontFamily: "'Playfair Display', serif",
            color: "#3e2723",
          }}
        >
          Manage Slots
        </Typography>

        {/* Create Slot Form */}
        <Paper sx={{ p: 4, mb: 6, borderRadius: 4 }}>
          <form onSubmit={handleCreate}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  type="date"
                  name="date"
                  label="Date"
                  InputLabelProps={{ shrink: true }}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  name="startTime"
                  label="Start Time"
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  name="endTime"
                  label="End Time"
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  type="number"
                  name="availableSeats"
                  label="Available Seats"
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  type="number"
                  name="price"
                  label="Price"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 3,
                backgroundColor: "#d97706",
                "&:hover": { backgroundColor: "#b45309" },
              }}
            >
              Create Slot
            </Button>
          </form>
        </Paper>

        {/* Existing Slots */}
        <Grid container spacing={3}>
          {slots.map((slot) => (
            <Grid size={{ xs: 12 }} key={slot._id}>
              <Card>
                <CardContent>
                  <Typography>
                    📅 {slot.date} | 🕒 {slot.startTime} - {slot.endTime}
                  </Typography>
                  <Typography>
                    Seats: {slot.availableSeats} | ₹{slot.price}
                  </Typography>

                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleDelete(slot._id)}
                  >
                    Delete
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

      </Container>
    </Box>
  );
}

export default ManageSlots;