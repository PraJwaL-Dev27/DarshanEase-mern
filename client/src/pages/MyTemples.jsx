import { useEffect, useState } from "react";
import api from "../services/api";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function MyTemples() {
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchTemples = async () => {
    try {
      const res = await api.get("/temples/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTemples(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemples();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this temple?")) return;

    try {
      await api.delete(`/temples/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchTemples();
    } catch (error) {
      alert("Delete failed");
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
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          textAlign="center"
          sx={{
            fontWeight: 700,
            mb: 6,
            color: "#3e2723",
            fontFamily: "'Playfair Display', serif",
          }}
        >
          My Temples
        </Typography>

        <Box textAlign="center" mb={5}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#d97706",
              "&:hover": { backgroundColor: "#b45309" },
            }}
            onClick={() => navigate("/create-temple")}
          >
            + Create New Temple
          </Button>
        </Box>

        <Grid container spacing={4}>
          {temples.map((temple) => (
            <Grid item xs={12} sm={6} md={4} key={temple._id}>
              <Card sx={{ borderRadius: 4 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={
                    temple.image ||
                    "https://images.unsplash.com/photo-1586511925558-a4c6376fe65f"
                  }
                  alt={temple.templeName}
                />
                <CardContent>
                  <Typography fontWeight={700}>
                    {temple.templeName}
                  </Typography>

                  <Typography sx={{ mb: 2 }}>
                    {temple.location}
                  </Typography>

                  <Button
                    size="small"
                    onClick={() => navigate(`/edit-temple/${temple._id}`)}
                  >
                    Edit
                  </Button>
                  <Button
  size="small"
  onClick={() => navigate(`/manage-slots/${temple._id}`)}
>
  Manage Slots
</Button>

                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleDelete(temple._id)}
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

export default MyTemples;