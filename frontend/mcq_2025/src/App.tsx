import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Submit from "./pages/Submit";
import Results from "./pages/Results";
import AdminLogin from "./admin/Login";
import AdminDashboard from "./admin/Dashboard";

const App: React.FC = () => {
  return (
    <div className="app-container">
      <nav className="nav">
        <Link to="/">Home</Link> | <Link to="/results">Results</Link> | <Link to="/admin">Admin</Link>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/results" element={<Results />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
