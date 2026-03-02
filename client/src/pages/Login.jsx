import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  Paper,
} from "@mui/material";
import { Email, Lock } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/");
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
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
          Welcome Back
        </Typography>

        <TextField
          fullWidth
          label="Email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          onClick={handleLogin}
        >
          Login
        </Button>

        <Typography
          sx={{
            mt: 3,
            textAlign: "center",
            cursor: "pointer",
            color: "#6d4c41",
          }}
          onClick={() => navigate("/register")}
        >
          Don't have an account? Register
        </Typography>
      </Paper>
    </Box>
  );
}

export default Login;