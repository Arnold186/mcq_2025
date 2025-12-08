import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { AiOutlinePlusCircle } from "react-icons/ai";

const Assignments: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex">
      <Sidebar currentPath={location.pathname} />
      <div className="flex-1 p-8">
        <div className="grid grid-cols-2 gap-6 max-w-4xl">
          <Link
            to="/admin/assignments/create"
            className="rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-500 p-12 text-center shadow-lg hover:shadow-xl transition relative"
          >
            <div className="text-white text-2xl font-bold mb-4">Assignment 1</div>
          </Link>
          <Link
            to="/admin/assignments/create"
            className="rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-500 p-12 text-center shadow-lg hover:shadow-xl transition relative"
          >
            <div className="text-white text-2xl font-bold mb-4">Create Assignment</div>
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
              <div className="w-15 h-15 rounded-full flex items-center justify-center translate-y-[5px]">
                <span className="text-emerald-100 text-2xl font-bold">
                  <AiOutlinePlusCircle />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Assignments;

