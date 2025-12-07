import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import { FiSearch, FiUsers, FiMonitor, FiChevronDown } from "react-icons/fi";

const Students: React.FC = () => {
  const location = useLocation();

  // Mock Data
  const students = [
    { name: "Jane Cooper", course: "Food science", reg: "(225) 555-0118", email: "jane@microsoft.com", assignment: "CAT 1", status: "Done" },
    { name: "Floyd Miles", course: "Food science", reg: "(205) 555-0100", email: "floyd@yahoo.com", assignment: "CAT 1", status: "Missed" },
    { name: "Ronald Richards", course: "Food science", reg: "(302) 555-0107", email: "ronald@adobe.com", assignment: "CAT 1", status: "Missed" },
    { name: "Marvin McKinney", course: "Food science", reg: "(252) 555-0126", email: "marvin@tesla.com", assignment: "Iran", status: "Done" },
    { name: "Jerome Bell", course: "Food science", reg: "(629) 555-0129", email: "jerome@google.com", assignment: "CAT 1", status: "Done" },
    { name: "Kathryn Murphy", course: "Food science", reg: "(406) 555-0120", email: "kathryn@microsoft.com", assignment: "CAT 1", status: "Done" },
    { name: "Jacob Jones", course: "Food science", reg: "(208) 555-0112", email: "jacob@yahoo.com", assignment: "CAT 1", status: "Done" },
  ];

  const getStatusColor = (status: string) => {
    if (status === "Done") return "bg-emerald-100 text-emerald-600 border-emerald-200";
    if (status === "Missed") return "bg-red-100 text-red-600 border-red-200";
    return "bg-slate-100 text-slate-600 border-slate-200";
  };

  return (
    <div className="min-h-screen bg-white flex font-sans text-slate-900">
      <Sidebar currentPath={location.pathname} />

      <main className="flex-1 bg-white">
        <div className="p-8 max-w-7xl mx-auto">
          {/* Top Header */}
          <div className="mb-10">
            <h1 className="text-2xl font-bold">
              Hello Arnold <span className="text-2xl">👋,</span>
            </h1>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl flex items-center gap-5">
              <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center">
                <FiUsers className="text-emerald-500 text-3xl" />
              </div>
              <div>
                <p className="text-slate-400 text-sm mb-1">Total Students</p>
                <p className="text-3xl font-bold text-slate-900">530</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl flex items-center gap-5">
              <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center">
                <FiMonitor className="text-emerald-500 text-3xl" />
              </div>
              <div>
                <p className="text-slate-400 text-sm mb-1">Assignments</p>
                <p className="text-3xl font-bold text-slate-900">003</p>
              </div>
            </div>
          </div>

          {/* Students Section */}
          <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <h2 className="text-xl font-bold">All Students</h2>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="pl-10 pr-4 py-2 bg-slate-50 rounded-lg text-sm outline-none focus:ring-2 focus:ring-emerald-100 w-64"
                  />
                </div>

                <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg text-sm text-slate-600 cursor-pointer hover:bg-slate-100">
                  <span>Short by : <span className="font-semibold text-slate-900">Newest</span></span>
                  <FiChevronDown />
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100 text-left">
                    <th className="py-4 px-2 text-sm font-medium text-slate-400">Customer Name</th>
                    <th className="py-4 px-2 text-sm font-medium text-slate-400">Course</th>
                    <th className="py-4 px-2 text-sm font-medium text-slate-400">REG-Number</th>
                    <th className="py-4 px-2 text-sm font-medium text-slate-400">Email</th>
                    <th className="py-4 px-2 text-sm font-medium text-slate-400">Assignment 1</th>
                    <th className="py-4 px-2 text-sm font-medium text-slate-400 text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={index} className="group hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-2 border-b border-slate-50 text-sm font-medium text-slate-900">{student.name}</td>
                      <td className="py-4 px-2 border-b border-slate-50 text-sm text-slate-900">{student.course}</td>
                      <td className="py-4 px-2 border-b border-slate-50 text-sm text-slate-900">{student.reg}</td>
                      <td className="py-4 px-2 border-b border-slate-50 text-sm text-slate-900">{student.email}</td>
                      <td className="py-4 px-2 border-b border-slate-50 text-sm text-slate-900">{student.assignment}</td>
                      <td className="py-4 px-2 border-b border-slate-50 text-right">
                        <span className={`inline-block px-4 py-1 rounded border text-xs font-medium ${getStatusColor(student.status)}`}>
                          {student.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Placeholder (if needed, not in image but good for 'All Students') */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Students;
