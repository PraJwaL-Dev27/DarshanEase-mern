import { useEffect, useState } from "react";
import api from "../services/api";
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
} from "@mui/material";

function AdminDashboard() {
  const [tab, setTab] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async (endpoint) => {
    setLoading(true);
    try {
      const res = await api.get(endpoint);
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (tab === 0) fetchData("/admin/users");
    if (tab === 1) fetchData("/admin/temples");
    if (tab === 2) fetchData("/admin/bookings");
    if (tab === 3) fetchData("/donations");
    if (tab === 4) fetchData("/feedback/admin/all"); // ✅ FIXED
  }, [tab]);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN");

  return (
    <Box sx={{ py: 10, backgroundColor: "#fdf6ec", minHeight: "100vh" }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          sx={{
            mb: 5,
            fontWeight: 700,
            fontFamily: "'Playfair Display', serif",
            color: "#3e2723",
            textAlign: "center",
          }}
        >
          Admin Dashboard
        </Typography>

        <Tabs
          value={tab}
          onChange={(e, newValue) => setTab(newValue)}
          centered
          sx={{ mb: 4 }}
        >
          <Tab label="Users" />
          <Tab label="Temples" />
          <Tab label="Bookings" />
          <Tab label="Donations" />
          <Tab label="Feedback" />
        </Tabs>

        {loading ? (
          <CircularProgress />
        ) : (
          <Paper sx={{ p: 3, borderRadius: 3 }}>

            {/* USERS */}
            {tab === 0 && (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Joined</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{formatDate(user.createdAt)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

            {/* TEMPLES */}
            {tab === 1 && (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Temple Name</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Start</TableCell>
                    <TableCell>End</TableCell>
                    <TableCell>Organizer</TableCell>
                    <TableCell>Created</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((temple) => (
                    <TableRow key={temple._id}>
                      <TableCell>{temple.templeName}</TableCell>
                      <TableCell>{temple.location}</TableCell>
                      <TableCell>{temple.darshanStartTime}</TableCell>
                      <TableCell>{temple.darshanEndTime}</TableCell>
                      <TableCell>{temple.organizer?.name}</TableCell>
                      <TableCell>{formatDate(temple.createdAt)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

            {/* BOOKINGS */}
            {tab === 2 && (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>User</TableCell>
                    <TableCell>Temple</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Seats</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((booking) => (
                    <TableRow key={booking._id}>
                      <TableCell>{booking.user?.name}</TableCell>
                      <TableCell>{booking.slot?.temple?.templeName}</TableCell>
                      <TableCell>
                        {booking.slot?.date
                          ? new Date(booking.slot.date).toLocaleDateString("en-IN")
                          : "-"}
                      </TableCell>
                      <TableCell>
                        {booking.slot?.startTime} - {booking.slot?.endTime}
                      </TableCell>
                      <TableCell>{booking.numberOfSeats}</TableCell>
                      <TableCell>{booking.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

            {/* DONATIONS */}
            {tab === 3 && (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>User</TableCell>
                    <TableCell>Temple</TableCell>
                    <TableCell>Amount (₹)</TableCell>
                    <TableCell>Message</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((donation) => (
                    <TableRow key={donation._id}>
                      <TableCell>{donation.user?.name}</TableCell>
                      <TableCell>{donation.temple?.templeName}</TableCell>
                      <TableCell>₹{donation.amount}</TableCell>
                      <TableCell>{donation.message || "-"}</TableCell>
                      <TableCell>{formatDate(donation.createdAt)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

            {/* FEEDBACK */}
            {tab === 4 && (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>User</TableCell>
                    <TableCell>Temple</TableCell>
                    <TableCell>Rating</TableCell>
                    <TableCell>Comment</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((fb) => (
                    <TableRow key={fb._id}>
                      <TableCell>{fb.user?.name}</TableCell>
                      <TableCell>{fb.temple?.templeName}</TableCell>
                      <TableCell>{fb.rating}</TableCell>
                      <TableCell>{fb.comment}</TableCell>
                      <TableCell>{formatDate(fb.createdAt)}</TableCell>
                      <TableCell>
                        <Button
                          color="error"
                          onClick={async () => {
                            if (window.confirm("Delete this feedback?")) {
                              await api.delete(`/feedback/admin/${fb._id}`);
                              fetchData("/feedback/admin/all");
                            }
                          }}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

          </Paper>
        )}
      </Container>
    </Box>
  );
}

export default AdminDashboard;