import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TempleDetails from "./pages/TempleDetails";
import MyBookings from "./pages/MyBookings";
import Temples from "./pages/Temples";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import BookSlot from "./pages/BookSlot";
import MyTemples from "./pages/MyTemples";
import CreateTemple from "./pages/CreateTemple";
import EditTemple from "./pages/EditTemple";
import ManageSlots from "./pages/ManageSlots";
import OrganizerBookings from "./pages/OrganizerBookings";
import Donate from "./pages/Donate";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/temple/:id" element={<TempleDetails />} />
        <Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route path="/my-bookings" element={<MyBookings />} />
<Route path="/temples" element={<Temples />} />
<Route path="/organizer-dashboard" element={<OrganizerDashboard />}/>
<Route path="/book-slot/:slotId" element={<BookSlot />} />
<Route path="/my-temples" element={<MyTemples />} />
<Route path="/create-temple" element={<CreateTemple />} />
<Route path="/edit-temple/:id" element={<EditTemple />} />
<Route path="/manage-slots/:templeId" element={<ManageSlots />} />
<Route path="/organizer-bookings" element={<OrganizerBookings />} />
<Route path="/donate/:templeId" element={<Donate />} />
<Route path="/admin" element={<AdminDashboard />} />
      </Routes>

      <Footer />   {/* 👈 Footer added here */}

    </Router>
  );
}

export default App;