import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { IoIosSave } from "react-icons/io";

const AssignmentSettings: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [duration, setDuration] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [mode, setMode] = useState<"duration" | "window">("duration");

  // Retrieve passed state from CreateAssignment
  const { questions, assignmentName } = location.state || {};

  useEffect(() => {
    if (!questions) {
      // If no questions found (e.g. direct access), maybe warn or redirect
      // For now, let's just log it.
      console.warn("No questions received from CreateAssignment");
    }
  }, [questions]);

  const handleSave = () => {
    // Create the final assignment object
    const assignmentData = {
      name: assignmentName || "Untitled Assignment",
      questions: questions || [],
      settings: {
        mode,
        duration: mode === "duration" ? duration : null,
        startTime: mode === "window" ? startTime : null,
        endTime: mode === "window" ? endTime : null,
      },
    };

    // Save to localStorage (Simulation of Backend)
    localStorage.setItem("publishedAssignment", JSON.stringify(assignmentData));
    console.log("Assignment saved to localStorage:", assignmentData);

    navigate("/admin/assignments");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <Sidebar currentPath={location.pathname} />
      <div className="flex-1 p-8">
        <div className="max-w-4xl">
          <h1 className="text-3xl font-bold text-slate-900 mb-8">Assignment Settings</h1>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="grid grid-cols-2 gap-8">
              {/* Fixed Duration */}
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-4">Fixed Duration</h2>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-2">
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 focus:outline-none focus:border-emerald-500 focus:bg-white"
                    placeholder="e.g., 20"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    disabled={mode === "window"}
                  />
                </div>
              </div>

              {/* Fixed Time Window */}
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-4">Fixed Time Window</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-2">Start</label>
                    <input
                      type="datetime-local"
                      className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 focus:outline-none focus:border-emerald-600 focus:bg-white"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      disabled={mode === "duration"}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-2">End</label>
                    <input
                      type="datetime-local"
                      className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 focus:outline-none focus:border-emerald-500 focus:bg-white"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      disabled={mode === "duration"}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Mode Toggle */}
            <div className="mt-6 flex gap-4">
              <button
                onClick={() => setMode("duration")}
                className={`px-4 py-2 rounded-lg font-medium transition ${mode === "duration"
                  ? "bg-emerald-500 text-white"
                  : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                  }`}
              >
                Use Fixed Duration
              </button>
              <button
                onClick={() => setMode("window")}
                className={`px-4 py-2 rounded-lg font-medium transition ${mode === "window"
                  ? "bg-emerald-500 text-white"
                  : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                  }`}
              >
                Use Fixed Time Window
              </button>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-emerald-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-600 transition shadow-lg"
            >
              <span><IoIosSave /></span>
              <span>Save & Publish</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentSettings;

