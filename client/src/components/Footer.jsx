import { Box, Container, Grid, Typography, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#3e2723",
        color: "#f5e6da",
        pt: 8,
        pb: 4,
        mt: 10,
      }}
    >
      <Container maxWidth="lg">
        {/* ✅ Grid v2 syntax */}
        <Grid container spacing={5}>

          {/* About Section */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                mb: 2,
              }}
            >
              DarshanEase
            </Typography>

            <Typography
              sx={{
                fontFamily: "'Poppins', sans-serif",
                lineHeight: 1.7,
                opacity: 0.9,
              }}
            >
              Making temple visits simple, smooth and spiritually fulfilling.
              Book your darshan slots easily and avoid long waiting lines.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                mb: 2,
              }}
            >
              Quick Links
            </Typography>

            {["Home", "Temples", "Bookings", "Contact"].map((item) => (
              <Typography
                key={item}
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  mb: 1,
                  cursor: "pointer",
                  transition: "0.3s",
                  "&:hover": {
                    color: "#f59e0b",
                  },
                }}
              >
                {item}
              </Typography>
            ))}
          </Grid>

          {/* Contact Info */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                mb: 2,
              }}
            >
              Contact Us
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <LocationOnIcon sx={{ mr: 1, fontSize: 20 }} />
              <Typography sx={{ fontFamily: "'Poppins', sans-serif" }}>
                India
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <PhoneIcon sx={{ mr: 1, fontSize: 20 }} />
              <Typography sx={{ fontFamily: "'Poppins', sans-serif" }}>
                +91 98765 43210
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <EmailIcon sx={{ mr: 1, fontSize: 20 }} />
              <Typography sx={{ fontFamily: "'Poppins', sans-serif" }}>
                support@darshanease.com
              </Typography>
            </Box>

            <Box>
              <IconButton
                sx={{
                  color: "#f5e6da",
                  "&:hover": { color: "#f59e0b" },
                }}
              >
                <FacebookIcon />
              </IconButton>

              <IconButton
                sx={{
                  color: "#f5e6da",
                  "&:hover": { color: "#f59e0b" },
                }}
              >
                <InstagramIcon />
              </IconButton>
            </Box>
          </Grid>

        </Grid>

        {/* Bottom Line */}
        <Box
          sx={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            mt: 6,
            pt: 3,
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 14,
              opacity: 0.7,
            }}
          >
            © {new Date().getFullYear()} DarshanEase. All Rights Reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;