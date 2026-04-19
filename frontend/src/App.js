import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Navbar from "./pages/Navbar";
import Profile from "./pages/Profile";

import "./App.css";

function App() {
  const [user, setUser] = useState(localStorage.getItem("user"));

  return (
    <Router>
      {user && <Navbar user={user} setUser={setUser} />}

      <Routes>
        {/* 🔐 Protected Home */}
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/login" />}
        />

        {/* 🔐 Protected Profile */}
        <Route
          path="/profile"
          element={user ? <Profile user={user} /> : <Navigate to="/login" />}
        />

        {/* Public Routes */}
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;