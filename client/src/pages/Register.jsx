import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  Paper,
} from "@mui/material";
import { Person, Email, Lock } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", formData);
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #fdf6ec 0%, #f6d7b0 40%, #e7b87a 70%, #d97706 100%)",
      }}
    >
      <Paper
        elevation={10}
        sx={{
          width: 400,
          p: 5,
          borderRadius: 4,
          background: "rgba(255,255,255,0.95)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            textAlign: "center",
            fontWeight: 700,
            color: "#3e2723",
            letterSpacing: 1,
          }}
        >
          Create Account
        </Typography>

        <TextField
          fullWidth
          label="Full Name"
          name="name"
          margin="normal"
          value={formData.name}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person sx={{ color: "#d97706" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
            },
          }}
        />

        <TextField
          fullWidth
          label="Email"
          name="email"
          margin="normal"
          value={formData.email}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email sx={{ color: "#d97706" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
            },
          }}
        />

        <TextField
          fullWidth
          type="password"
          label="Password"
          name="password"
          margin="normal"
          value={formData.password}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock sx={{ color: "#d97706" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
            },
          }}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            py: 1.5,
            borderRadius: 3,
            fontWeight: 600,
            backgroundColor: "#d97706",
            "&:hover": { backgroundColor: "#b45309" },
          }}
          onClick={handleRegister}
        >
          Create Account
        </Button>

        <Typography
          sx={{
            mt: 3,
            textAlign: "center",
            cursor: "pointer",
            color: "#6d4c41",
          }}
          onClick={() => navigate("/login")}
        >
          Already have an account? Login
        </Typography>
      </Paper>
    </Box>
  );
}

export default Register;