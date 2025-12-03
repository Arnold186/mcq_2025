import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

const Help: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-white flex">
      <Sidebar currentPath={location.pathname} />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Help</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-slate-600">Help and documentation page coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default Help;

