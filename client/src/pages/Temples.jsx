import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import FadeInSection from "../components/FadeInSection";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  CircularProgress,
} from "@mui/material";

function Temples() {
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTemples = async () => {
      try {
        const res = await api.get("/temples");
        setTemples(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemples();
  }, []);

  if (loading) {
    return (
      
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        py: 10,
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #fff7ed, #fdf6ec)",
      }}
    >
      <Container maxWidth="lg">

        {/* Heading */}
        <Box textAlign="center" mb={8}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              fontFamily: "'Playfair Display', serif",
              color: "#3e2723",
            }}
          >
            Explore Sacred Temples
          </Typography>

          <Box
            sx={{
              width: 100,
              height: 4,
              backgroundColor: "#d97706",
              margin: "14px auto",
              borderRadius: 2,
            }}
          />

          <Typography sx={{ color: "#8d6e63" }}>
            {temples.length} Temples Available for Darshan Booking
          </Typography>
        </Box>

        {/* Temple Cards */}
       <Grid container spacing={5}>
  {temples.map((temple) => (
    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={temple._id}>
     <Card
  sx={{
    height: "100%",
    display: "flex",
    flexDirection: "column",
    borderRadius: 4,
    boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
    transition: "all 0.4s ease",
    overflow: "visible",
    "&:hover": {
      transform: "translateY(-12px)",
      boxShadow: "0 30px 60px rgba(0,0,0,0.2)",
    },
  }}
>
                {/* Image */}
                <Box sx={{ overflow: "hidden" }}>
                  <CardMedia
                    component="img"
                    height="240"
                    image={
                      temple.image ||
                      "https://images.unsplash.com/photo-1586511925558-a4c6376fe65f"
                    }
                    alt={temple.templeName}
                    sx={{
                      transition: "0.5s",
                      "&:hover": {
                        transform: "scale(1.08)",
                      },
                    }}
                  />
                </Box>

                {/* Content */}
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      fontFamily: "'Playfair Display', serif",
                      color: "#3e2723",
                    }}
                  >
                    {temple.templeName}
                  </Typography>

                  <Typography sx={{ color: "#6d4c41", mb: 1 }}>
                    📍 {temple.location}
                  </Typography>

                  <Typography sx={{ fontSize: "0.85rem", mb: 1 }}>
                    🕒 {temple.darshanStartTime} - {temple.darshanEndTime}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "0.9rem",
                      color: "#5d4037",
                      mb: 2,
                      minHeight: "60px",
                    }}
                  >
                    {temple.description
                      ? temple.description.substring(0, 90) + "..."
                      : "Experience divine blessings and peaceful darshan."}
                  </Typography>

                  {/* Push Button To Bottom */}
                  <Box sx={{ mt: "auto" }}>
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{
                        backgroundColor: "#d97706",
                        fontWeight: 600,
                        letterSpacing: 1,
                        "&:hover": { backgroundColor: "#b45309" },
                      }}
                      onClick={() => navigate(`/temple/${temple._id}`)}
                    >
                      View Details
                    </Button>
                    <Button
  fullWidth
  variant="outlined"
  sx={{
    mt: 1,
    borderColor: "#d97706",
    color: "#d97706",
    "&:hover": {
      backgroundColor: "#fff3e0",
      borderColor: "#b45309",
    },
  }}
  onClick={() => navigate(`/donate/${temple._id}`)}
>
  Donate
</Button>
                  </Box>

                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

      </Container>
    </Box>
  );
}

export default Temples;