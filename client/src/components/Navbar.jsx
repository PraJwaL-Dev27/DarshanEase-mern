import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";
import TempleHinduIcon from "@mui/icons-material/TempleHindu";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  // Check login state
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, [location]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Logout
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
          px: { xs: 2, md: 6 },   // responsive padding
          flexWrap: "wrap",       // prevents overflow
        }}
      >

        {/* Logo */}
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

        {/* Navigation */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 3.5,
          }}
        >
          <Button
            sx={{ color: "white" }}
            onClick={() => navigate("/temples")}
          >
            Temples
          </Button>

          {user ? (
            <>
              {user.role === "USER" && (
                <Button
                  sx={{ color: "white" }}
                  onClick={() => navigate("/my-bookings")}
                >
                  My Bookings
                </Button>
              )}

              {user.role === "ADMIN" && (
                <Button
                  sx={{ color: "white" }}
                  onClick={() => navigate("/admin")}
                >
                  Admin Panel
                </Button>
              )}

              {user.role === "ORGANIZER" && (
                <>
                  <Button
                    sx={{ color: "white" }}
                    onClick={() => navigate("/my-temples")}
                  >
                    My Temples
                  </Button>

                  <Button
                    sx={{ color: "white" }}
                    onClick={() => navigate("/organizer-bookings")}
                  >
                    Organizer Dashboard
                  </Button>
                </>
              )}

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
                sx={{ color: "white" }}
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