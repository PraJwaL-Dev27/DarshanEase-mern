import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";

function Donate() {
  const { templeId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleDonate = async (e) => {
    e.preventDefault();

    try {
      await api.post(
  "/donations",
  {
    templeId: templeId,
    amount,
    message,
  },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Donation Successful 🙏");
      navigate("/");
    } catch (error) {
      alert("Donation failed");
    }
  };

  return (
    <Box sx={{ py: 10, backgroundColor: "#fdf6ec", minHeight: "100vh" }}>
      <Container maxWidth="sm">
        <Paper sx={{ p: 5, borderRadius: 4 }}>
          <Typography
            variant="h4"
            sx={{
              mb: 4,
              fontWeight: 700,
              fontFamily: "'Playfair Display', serif",
              color: "#3e2723",
              textAlign: "center",
            }}
          >
            Support the Temple 🙏
          </Typography>

          <form onSubmit={handleDonate}>
            <TextField
              fullWidth
              type="number"
              label="Donation Amount (₹)"
              margin="normal"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <TextField
              fullWidth
              label="Message (Optional)"
              margin="normal"
              multiline
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
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
              Donate Now
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}

export default Donate;