import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaClock, FaCheckCircle, FaPlay } from "react-icons/fa";

interface Assignment {
    name: string;
    questions: any[];
    settings: {
        duration: string | null;
    };
}

const StudentDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [studentName, setStudentName] = useState("Student");
    const [assignment, setAssignment] = useState<Assignment | null>(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    useEffect(() => {
        // Load Student Profile
        const profileStr = localStorage.getItem("studentProfile");
        if (profileStr) {
            const profile = JSON.parse(profileStr);
            setStudentName(profile.name || "Student");
        }

        // Load Assignment
        const savedAssignment = localStorage.getItem("publishedAssignment");
        if (savedAssignment) {
            try {
                setAssignment(JSON.parse(savedAssignment));
            } catch (e) {
                console.error("Failed to parse", e);
            }
        }
    }, []);

    const handleStartClick = () => {
        setShowConfirmModal(true);
    };

    const handleConfirmStart = () => {
        navigate("/student/quiz");
    };

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="max-w-5xl mx-auto">
                {/* Welcome Header */}
                <div className="mb-12">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">
                        Welcome back, <span className="text-emerald-500">{studentName}</span>
                    </h1>
                    <p className="text-slate-600">Here are your pending assignments.</p>
                </div>

                {/* Assignments Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {assignment ? (
                        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            <div className="h-2 bg-gradient-to-r from-emerald-400 to-emerald-600" />
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="bg-emerald-100 text-emerald-700 p-3 rounded-xl">
                                        <FaClock size={24} />
                                    </div>
                                    <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider rounded-full">
                                        Pending
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 mb-2">{assignment.name}</h3>

                                <div className="space-y-2 mb-6 text-sm text-slate-600">
                                    <p className="flex items-center gap-2">
                                        <FaCheckCircle className="text-emerald-500" />
                                        {assignment.questions ? assignment.questions.length : 0} Questions
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <FaClock className="text-emerald-500" />
                                        {assignment.settings.duration ? `${assignment.settings.duration} Minutes` : "No Time Limit"}
                                    </p>
                                </div>

                                <button
                                    onClick={handleStartClick}
                                    className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 group"
                                >
                                    Start Assignment
                                    <FaPlay size={12} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 shadow-sm col-span-2">
                            <p className="text-slate-500 text-lg">No active assignments found.</p>
                            <p className="text-sm text-slate-400 mt-2">Check back later or ask your instructor.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Confirmation Modal */}
            {showConfirmModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl transform transition-all scale-100">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaPlay size={24} className="ml-1" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Ready to Start?</h3>
                            <p className="text-slate-600">
                                Once you start, the timer will begin. You cannot pause or restart the assignment.
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setShowConfirmModal(false)}
                                className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmStart}
                                className="flex-1 py-3 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-emerald-200"
                            >
                                I'm Ready
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentDashboard;
