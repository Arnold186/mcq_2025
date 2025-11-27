import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard: React.FC = () => {
  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      <ul>
        <li><Link to="/admin/questions">Manage Questions (implement)</Link></li>
        <li><Link to="/admin/assignment">Assignment Settings (implement)</Link></li>
        <li><Link to="/results">View Results</Link></li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
