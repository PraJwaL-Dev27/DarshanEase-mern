import { motion, useScroll, useTransform } from "framer-motion";
import { Button, Typography, Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import templeImage from "../assets/temple3.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

import { useEffect, useState } from "react";
import api from "../services/api";

function Home() {


  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 200]);

  const [temples, setTemples] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchTemples = async () => {
    try {
      const res = await api.get("/temples");
      setTemples(res.data);
    } catch (error) {
      console.error("Error fetching temples:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchTemples();
}, []);
if (loading) {
    return <p style={{ textAlign: "center" }}>Loading temples...</p>;
  }
  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <Box
        sx={{
          height: "100vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Parallax Background */}
        <motion.div
          style={{
            y,
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${templeImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Gradient Overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.75), rgba(0,0,0,0.5))",
          }}
        />

        {/* Hero Content */}
        <Box
          sx={{
            position: "relative",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            color: "white",
            px: 2,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Typography
              variant="h3"
              gutterBottom
              sx={{ fontWeight: 700 }}
            >
              Welcome to DarshanEase
            </Typography>

            <Typography
              variant="h6"
              sx={{ opacity: 0.9, maxWidth: 600, margin: "0 auto" }}
            >
              Book Temple Darshan Slots with Ease & Devotion
            </Typography>

            <Button
              variant="contained"
              size="large"
              sx={{
                mt: 4,
                backgroundColor: "#d97706",
                px: 4,
                py: 1.5,
                fontWeight: 600,
                "&:hover": { backgroundColor: "#b45309" },
              }}
              onClick={() => navigate("/temples")}
            >
              Explore Temples
            </Button>
          </motion.div>
        </Box>
      </Box>

      {/* ================= WHY SECTION ================= */}
  {/* ================= WHY CHOOSE ================= */}
<Box sx={{ py: 10, backgroundColor: "#fdf6ec", textAlign: "center" }}>
  <Container>

    {/* Heading */}
    <Typography
      variant="h4"
      sx={{
        fontFamily: "'Playfair Display', serif",
        fontWeight: 700,
        color: "#4e342e",
        position: "relative",
        display: "inline-block",
        mb: 3,
      }}
    >
      Why Choose{" "}
      <Box
        component="span"
        sx={{
          color: "#d97706",
          fontWeight: 800,
        }}
      >
        DarshanEase
      </Box>
      ?
    </Typography>

    {/* Horizontal Line */}
    <Box
      sx={{
        width: "90px",
        height: "4px",
        background: "linear-gradient(to right, #f59e0b, #d97706)",
        borderRadius: "6px",
        margin: "12px auto 40px auto",
      }}
    />

    {/* Cards */}
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 4,
        flexWrap: "wrap",
      }}
    >
      {[
        {
          title: "Easy Booking",
          desc: "Book your darshan slot in just a few clicks.",
        },
        {
          title: "Secure Payments",
          desc: "Safe and secure donation & booking system.",
        },
        {
          title: "Spiritual Experience",
          desc: "Enjoy a smooth and divine temple visit.",
        },
      ].map((card, index) => (
        <Box
          key={index}
          sx={{
            background: "linear-gradient(145deg, #ffffff, #f9ede3)",
            padding: 4,
            borderRadius: 4,
            width: 280,
            boxShadow: "0 15px 30px rgba(121, 85, 72, 0.15)",
            border: "1px solid #f0e0d6",
            transition: "0.3s",
            "&:hover": {
              transform: "translateY(-8px)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            },
          }}
        >
          <Typography
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 600,
              color: "#4e342e",
              mb: 1,
            }}
          >
            {card.title}
          </Typography>

          <Typography
            sx={{
              fontFamily: "'Poppins', sans-serif",
              color: "#6d4c41",
            }}
          >
            {card.desc}
          </Typography>
        </Box>
      ))}
    </Box>

  </Container>
</Box>
      {/* ================= POPULAR TEMPLES ================= */}
      <Box sx={{ py: 10, backgroundColor: "#fdf6ec" }}>
  <Container maxWidth="lg">

    {/* ===== Heading ===== */}
    <Box textAlign="center" mb={6}>
      <Typography
        variant="h4"
        sx={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700,
          color: "#3e2723", // keeping original color
          display: "inline-block",
        }}
      >
        Popular Temples
      </Typography>

      {/* Horizontal Line */}
      <Box
        sx={{
          width: "90px",
          height: "4px",
          background: "linear-gradient(to right, #f59e0b, #d97706)",
          borderRadius: "6px",
          margin: "12px auto 0 auto",
        }}
      />
    </Box>
    {/* ===== Carousel ===== */}
    <Swiper
      modules={[Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      loop
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
    >
      {temples.map((temple, index) => (
        <SwiperSlide key={index}>
          <Box
            sx={{
              background: "#fff",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
              transition: "0.3s",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: "0 15px 35px rgba(0,0,0,0.12)",
              },
            }}
          >
            <img
              src={temple.image}
              alt={temple.name}
              style={{
                width: "100%",
                height: "220px",
                objectFit: "cover",
              }}
            />

            <Box sx={{ p: 3 }}>
  {/* Temple Name */}
  <Typography
    variant="h6"
    sx={{
      fontWeight: 700,
      color: "#3e2723",
      fontFamily: "'Playfair Display', serif",
    }}
  >
    {temple.templeName}
  </Typography>

  {/* Location */}
  <Typography
    variant="body2"
    sx={{
      color: "#6d4c41",
      mb: 1,
      fontFamily: "'Poppins', sans-serif",
    }}
  >
    📍 {temple.location}
  </Typography>

  {/* Timings */}
  <Typography
    variant="body2"
    sx={{
      color: "#8d6e63",
      mb: 1,
      fontSize: "0.85rem",
    }}
  >
    🕒 {temple.darshanStartTime} - {temple.darshanEndTime}
  </Typography>

  {/* Short Description */}
  <Typography
    variant="body2"
    sx={{
      color: "#5d4037",
      fontSize: "0.85rem",
      mb: 2,
      minHeight: "40px",
    }}
  >
    {temple.description
      ? temple.description.substring(0, 60) + "..."
      : "Experience divine blessings and peaceful darshan."}
  </Typography>

  <Button
    variant="contained"
    fullWidth
    sx={{
      backgroundColor: "#d97706",
      "&:hover": { backgroundColor: "#b45309" },
    }}
    onClick={() => navigate(`/temple/${temple._id}`)}
  >
    View Slots
  </Button>
</Box>
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>

{/* ================= TESTIMONIALS ================= */}
{/* ================= TESTIMONIALS ================= */}
<Box sx={{ py: 10, backgroundColor: "#fff8f0" }}>
  <Container maxWidth="md">

    {/* ===== Heading ===== */}
    <Box textAlign="center" mb={6}>
      <Typography
        variant="h4"
        sx={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700,
          color: "#4e342e",
          display: "inline-block",
        }}
      >
        What Devotees Say
      </Typography>

      {/* Horizontal Line */}
      <Box
        sx={{
          width: "90px",
          height: "4px",
          background: "linear-gradient(to right, #f59e0b, #d97706)",
          borderRadius: "6px",
          margin: "12px auto 0 auto",
        }}
      />
    </Box>

    {/* ===== Reviews ===== */}
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {[
        {
          name: "Amit Sharma",
          image: "https://randomuser.me/api/portraits/men/32.jpg",
          text: "Booking was extremely smooth and saved me hours of waiting.",
        },
        {
          name: "Priya Verma",
          image: "https://randomuser.me/api/portraits/women/44.jpg",
          text: "Very easy to use platform and secure payment system.",
        },
        {
          name: "Rohit Gupta",
          image: "https://randomuser.me/api/portraits/men/55.jpg",
          text: "A truly divine and hassle-free temple booking experience.",
        },
      ].map((review, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3,
            background: "white",
            p: 4,
            borderRadius: 4,
            boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
            borderLeft: "5px solid #d97706",
            transition: "0.3s",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
            },
          }}
        >
          {/* Profile Image */}
          <Box
            component="img"
            src={review.image}
            alt={review.name}
            sx={{
              width: 70,
              height: 70,
              borderRadius: "50%",
              objectFit: "cover",
              border: "3px solid #d97706",
            }}
          />

          {/* Review Content */}
          <Box>
            <Typography
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontStyle: "italic",
                color: "#6d4c41",
              }}
            >
              “{review.text}”
            </Typography>

            <Typography
              sx={{
                fontFamily: "'Poppins', sans-serif",
                mt: 1,
                fontWeight: 600,
                color: "#4e342e",
              }}
            >
              – {review.name}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>

  </Container>
</Box>
        </Container>
      </Box>
    </>
  );
}

export default Home;