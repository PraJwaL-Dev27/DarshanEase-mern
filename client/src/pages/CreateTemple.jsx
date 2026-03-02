import { useState } from "react";
import api from "../services/api";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function CreateTemple() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    templeName: "",
    location: "",
    darshanStartTime: "",
    darshanEndTime: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/temples", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/my-temples");
    } catch (error) {
      alert("Temple creation failed");
    }
  };

  return (
    <Box sx={{ py: 10, backgroundColor: "#fdf6ec", minHeight: "100vh" }}>
      <Container maxWidth="sm">
        <Paper sx={{ p: 5, borderRadius: 4 }}>
          <Typography
            variant="h5"
            sx={{
              mb: 4,
              fontWeight: 700,
              fontFamily: "'Playfair Display', serif",
              color: "#3e2723",
            }}
          >
            Create New Temple
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Temple Name"
              name="templeName"
              margin="normal"
              required
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Location"
              name="location"
              margin="normal"
              required
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Darshan Start Time"
              name="darshanStartTime"
              margin="normal"
              required
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Darshan End Time"
              name="darshanEndTime"
              margin="normal"
              required
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Description"
              name="description"
              margin="normal"
              multiline
              rows={3}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Image URL"
              name="image"
              margin="normal"
              onChange={handleChange}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                mt: 3,
                backgroundColor: "#d97706",
                "&:hover": { backgroundColor: "#b45309" },
              }}
            >
              Create Temple
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}

export default CreateTemple;