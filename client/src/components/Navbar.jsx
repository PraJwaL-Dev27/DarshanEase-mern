import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";
import TempleHinduIcon from "@mui/icons-material/TempleHindu";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  // 🔐 Check login state
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [location]);

  // 🌊 Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🚪 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: scrolled
          ? "rgba(0,0,0,0.8)"
          : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "all 0.4s ease",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: 6,
        }}
      >
        {/* 🔥 LOGO SECTION */}
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
          >
            <TempleHinduIcon
              sx={{
                color: "#f59e0b",
                fontSize: 32,
                mr: 1,
              }}
            />
          </motion.div>

          <Typography
            variant="h5"
            sx={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              background: "linear-gradient(90deg, #f59e0b, #ffcc80)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "1px",
            }}
          >
            DarshanEase
          </Typography>
        </motion.div>

        {/* 🔥 CENTER NAV LINKS */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button
            sx={{ color: "white", mr: 3 }}
            onClick={() => navigate("/temples")}
          >
            Temples
          </Button>

         {user ? (
  <>
    {/* USER Role */}
    {user.role === "USER" && (
      <Button
        sx={{ color: "white", mr: 2 }}
        onClick={() => navigate("/my-bookings")}
      >
        My Bookings
      </Button>
    )}
    {user.role === "ADMIN" && (
  <Button
    sx={{ color: "white", mr: 2 }}
    onClick={() => navigate("/admin")}
  >
    Admin Panel
  </Button>
)}

    {/* ORGANIZER Role */}
    {user.role === "ORGANIZER" && (
      <>
        <Button
          sx={{ color: "white", mr: 2 }}
          onClick={() => navigate("/my-temples")}
        >
          My Temples
        </Button>

        <Button
          sx={{ color: "white", mr: 2 }}
          onClick={() => navigate("/organizer-bookings")}
        >
          Organizer Dashboard
        </Button>
      </>
    )}

    {/* Logout Button (All Roles) */}
    <Button
      variant="outlined"
      sx={{
        color: "white",
        borderColor: "white",
        "&:hover": {
          borderColor: "#f59e0b",
          color: "#f59e0b",
        },
      }}
      onClick={handleLogout}
    >
      Logout
    </Button>
  </>
) : (
  <>
    <Button
      sx={{ color: "white", mr: 2 }}
      onClick={() => navigate("/login")}
    >
      Login
    </Button>

    <Button
      variant="outlined"
      sx={{
        color: "white",
        borderColor: "white",
        "&:hover": {
          borderColor: "#f59e0b",
          color: "#f59e0b",
        },
      }}
      onClick={() => navigate("/register")}
    >
      Register
    </Button>
  </>
)}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;