import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdDashboard, MdAssignment } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";


interface SidebarProps {
  currentPath: string;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPath }) => {
  const navigate = useNavigate();

  const menuItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: <MdDashboard /> },
    { path: "/admin/assignments", label: "Assignments", icon: <MdAssignment /> },
    { path: "/admin/students", label: "Students", icon: <PiStudentBold /> },
    // { path: "/admin/help", label: "Help", icon: "❓" },
  ];

  return (
    <div className="w-64 h-screen sticky top-0 bg-white border-r border-slate-200 flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-700 rounded flex items-center justify-center">
            <div className="w-4 h-4 bg-slate-400 rounded"></div>
          </div>
          <div>
            <div className="font-bold text-slate-900">Dashboard</div>
            <div className="text-xs text-slate-500">MCQ</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = currentPath === item.path || currentPath.startsWith(item.path + "/");
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive
                    ? "bg-emerald-500 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                    }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                  {!isActive && <span className="ml-auto">→</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-300 flex items-center justify-center">
            <span className="text-slate-600 text-sm font-semibold">A</span>
          </div>
          <div className="flex-1">
            <div className="font-semibold text-slate-900 text-sm">Arnold</div>
            <div className="text-xs text-slate-500">lecturer</div>
          </div>
          <span className="text-slate-400">▼</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

