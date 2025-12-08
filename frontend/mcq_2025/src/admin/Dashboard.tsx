import React from "react";
import { Link, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

const Dashboard: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-white flex">
      <Sidebar currentPath={location.pathname} />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Dashboard</h1>
        <div className="grid grid-cols-2 gap-6 max-w-4xl">
          <Link
            to="/admin/assignments"
            className="rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-500 p-12 text-center shadow-lg hover:shadow-xl transition"
          >
            <div className="text-white text-2xl font-bold">Course 1</div>
          </Link>
          <Link
            to="/admin/assignments"
            className="rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-500 p-12 text-center shadow-lg hover:shadow-xl transition"
          >
            <div className="text-white text-2xl font-bold">Course 2</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

