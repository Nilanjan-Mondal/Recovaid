import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Auth from "./components/Auth";
import { BaseUrl } from "./configs/ClientConfig";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import Footer from "./components/Footer";
import AboutUs from "./pages/AboutUs";

function App() {
  return (
    <Router>
      {/* Wrapping the main app in Router becuase useNavigate is only possible in a routed component (if we use useNavigate inside normal function App() it will give error) */}
      <MainApp />
    </Router>
  );
}

function MainApp() {
  const [authOpen, setAuthOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch(`${BaseUrl}/ping`, {
          method: "GET",
          credentials: "include",
        });
        setIsLoggedIn(res.ok);
      } catch {
        setIsLoggedIn(false);
      }
    };
    checkLogin();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch(`${BaseUrl}/api/auth/logout`, {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        setIsLoggedIn(false);
        navigate("/");
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleLogin = async (role) => {
    setIsLoggedIn(true);
    setRole(role);
    if (role === "doctor") {
      navigate("/doctorDashboard");
    } else if (role === "patient") {
      navigate("/patientDashboard");
    }
  };

  const handleGoToDashboard = () => {
    if (role === "doctor") {
      navigate("/doctorDashboard");
    } else if (role === "patient") {
      navigate("/patientDashboard");
    }
  };

  return (
    <>
      <Navbar
        onRegisterClick={() => setAuthOpen(true)}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        onDashboard={handleGoToDashboard}
      />

      {authOpen && (
        <Auth onClose={() => setAuthOpen(false)} onLogin={handleLogin} />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <Home
              onRegisterClick={() => setAuthOpen(true)}
              isLoggedIn={isLoggedIn}
              onDashboard={handleGoToDashboard}
            />
          }
        />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/patientDashboard" element={<PatientDashboard />} />
        <Route path="/doctorDashboard" element={<DoctorDashboard />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
