import { useEffect, useState } from "react";
import api from "../services/api";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

function EditTemple() {
  const { id } = useParams();
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

  useEffect(() => {
    const fetchTemple = async () => {
      const res = await api.get(`/temples`);
      const temple = res.data.find((t) => t._id === id);
      if (temple) setFormData(temple);
    };

    fetchTemple();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/temples/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/my-temples");
    } catch (error) {
      alert("Update failed");
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
            Edit Temple
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Temple Name"
              name="templeName"
              margin="normal"
              value={formData.templeName}
              onChange={handleChange}
              required
            />

            <TextField
              fullWidth
              label="Location"
              name="location"
              margin="normal"
              value={formData.location}
              onChange={handleChange}
              required
            />

            <TextField
              fullWidth
              label="Darshan Start Time"
              name="darshanStartTime"
              margin="normal"
              value={formData.darshanStartTime}
              onChange={handleChange}
              required
            />

            <TextField
              fullWidth
              label="Darshan End Time"
              name="darshanEndTime"
              margin="normal"
              value={formData.darshanEndTime}
              onChange={handleChange}
              required
            />

            <TextField
              fullWidth
              label="Description"
              name="description"
              margin="normal"
              multiline
              rows={3}
              value={formData.description}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Image URL"
              name="image"
              margin="normal"
              value={formData.image}
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
              Update Temple
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}

export default EditTemple;