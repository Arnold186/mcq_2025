import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Question {
  id: number;
  question: string; // Mapped from questionText in local storage if needed
  options: string[];
  selectedAnswers: number[]; // Array for both single and multi
  marks?: number;
  correctAnswers?: number[]; // Array for grading
}

const StudentQuiz: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(20 * 60); // Default 20 minutes
  const [questions, setQuestions] = useState<Question[]>([]);
  const [assignmentName, setAssignmentName] = useState("Assignment Name");

  // Load Assignment Data
  useEffect(() => {
    const savedAssignment = localStorage.getItem("publishedAssignment");
    if (savedAssignment) {
      try {
        const parsed = JSON.parse(savedAssignment);
        setAssignmentName(parsed.name || "Assignment");

        // Map admin questions to student quiz format
        const mappedQuestions = parsed.questions.map((q: any) => ({
          id: q.id,
          question: q.questionText,
          options: q.options,
          marks: q.marks || 1, // Default marks if missing
          correctAnswers: q.correctAnswers || (q.correctAnswer !== undefined ? [q.correctAnswer] : []),
          selectedAnswers: [],
        }));
        setQuestions(mappedQuestions);

        // Set Timer
        const settings = parsed.settings;
        if (settings && settings.duration) {
          const durationMins = parseInt(settings.duration);
          if (!isNaN(durationMins)) {
            setTimeRemaining(durationMins * 60);
          }
        }
      } catch (e) {
        console.error("Failed to parse assignment data", e);
        loadMockData();
      }
    } else {
      loadMockData();
    }
  }, []);

  const loadMockData = () => {
    setQuestions([
      {
        id: 1,
        question: "Which of the following organelles is primarily responsible for generating most of the cell's supply of adenosine triphosphate (ATP), used as a source of chemical energy?",
        options: ["Golgi Apparatus", "Golgi Apparatus", "Mitochondrion", "Golgi Apparatus"],
        marks: 5,
        correctAnswers: [2],
        selectedAnswers: [],
      },
      {
        id: 2,
        question: "What is the powerhouse of the cell?",
        options: ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic Reticulum"],
        marks: 5,
        correctAnswers: [1],
        selectedAnswers: [],
      },
      {
        id: 3,
        question: "Select all organelles involved in protein synthesis (Mock Multi-Select)",
        options: ["Ribosome", "Rough Endoplasmic Reticulum", "Lysosome", "Mitochondria"],
        marks: 5,
        correctAnswers: [0, 1],
        selectedAnswers: [],
      },
    ]);
    setAssignmentName("Assignment Name");
  };

  useEffect(() => {
    if (questions.length === 0) return; // Don't start timer if no questions

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit(); // Auto submit
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [questions]); // Restart if questions load late? No, simple timer is fine.

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswerSelect = (optionIndex: number) => {
    const updatedQuestions = [...questions];
    const question = updatedQuestions[currentQuestionIndex];
    const isMultiSelect = (question.correctAnswers?.length || 0) > 1;

    if (isMultiSelect) {
      // Toggle
      if (question.selectedAnswers.includes(optionIndex)) {
        question.selectedAnswers = question.selectedAnswers.filter(i => i !== optionIndex);
      } else {
        question.selectedAnswers.push(optionIndex);
      }
    } else {
      // Replace
      question.selectedAnswers = [optionIndex];
    }

    setQuestions(updatedQuestions);
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmit = () => {
    // Calculate Score
    let obtainedMarks = 0;
    let totalMarks = 0;

    questions.forEach(q => {
      const qMarks = q.marks || 0;
      totalMarks += qMarks;

      const selected = (q.selectedAnswers || []).sort((a, b) => a - b);
      const correct = (q.correctAnswers || []).sort((a, b) => a - b);

      // Array comparison
      const isCorrect = selected.length === correct.length && selected.every((val, index) => val === correct[index]);

      if (isCorrect) {
        obtainedMarks += qMarks;
      }
    });

    navigate("/student/submission", {
      state: {
        obtainedMarks,
        totalMarks,
        totalQuestions: questions.length
      }
    });
  };

  if (questions.length === 0) {
    return <div className="p-8 text-center text-slate-600">Loading Assignment...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">{assignmentName}</h1>
          <div className="text-2xl font-semibold text-emerald-500">{formatTime(timeRemaining)}</div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Main Content Area */}
          <div className="md:col-span-2">
            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold text-slate-900">
                    Question {currentQuestionIndex + 1}
                  </h2>
                  {(currentQuestion.correctAnswers?.length || 0) > 1 && (
                    <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      Select all that apply
                    </span>
                  )}
                </div>
                <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                  {currentQuestion.marks} Marks
                </span>
              </div>

              <p className="mb-6 text-base text-slate-700">{currentQuestion.question}</p>

              <div className="mb-8 space-y-3">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = currentQuestion.selectedAnswers.includes(index);
                  const isMultiSelect = (currentQuestion.correctAnswers?.length || 0) > 1;
                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full rounded-xl border-2 p-4 text-left transition-all ${isSelected
                        ? "border-emerald-500 bg-emerald-500 text-white"
                        : "border-slate-200 bg-slate-50 text-slate-900 hover:border-emerald-300"
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-6 w-6 items-center justify-center border-2 transition-all ${isMultiSelect ? "rounded-md" : "rounded-full"
                            } ${isSelected
                              ? "border-white bg-transparent"
                              : "border-slate-400 bg-transparent"
                            }`}
                        >
                          {isSelected && (
                            isMultiSelect ? (
                              // Checkmark for multi-select
                              <div className="h-3 w-3 bg-white shadow-sm" style={{ clipPath: "polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%)" }} />
                            ) : (
                              // Dot for single-select
                              <div className="h-3 w-3 rounded-full bg-white shadow-sm" />
                            )
                          )}
                        </div>
                        <span className="flex-1">{option}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                  className={`rounded-xl border-2 px-6 py-2 font-semibold transition ${currentQuestionIndex === 0
                    ? "border-slate-300 text-slate-400 cursor-not-allowed"
                    : "border-emerald-500 text-emerald-500 hover:bg-emerald-50"
                    }`}
                >
                  Previous
                </button>
                {isLastQuestion ? (
                  <button
                    onClick={handleSubmit}
                    className="rounded-xl bg-emerald-500 px-6 py-2 font-semibold text-white shadow-lg shadow-emerald-200 transition hover:bg-emerald-600"
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="rounded-xl border-2 border-emerald-500 px-6 py-2 font-semibold text-emerald-500 transition hover:bg-emerald-50"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">Questions</h3>
              <div className="space-y-2">
                {questions.map((question, index) => (
                  <button
                    key={question.id}
                    onClick={() => setCurrentQuestionIndex(index)}
                    className={`w-full rounded-xl p-3 text-left transition ${index === currentQuestionIndex
                      ? "bg-emerald-50 text-emerald-600 font-semibold"
                      : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                      }`}
                  >
                    Question {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentQuiz;

