import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Question {
  id: number;
  question: string;
  options: string[];
  selectedAnswer?: number;
}

const StudentQuiz: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(20 * 60); // 20 minutes in seconds
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      question: "Which of the following organelles is primarily responsible for generating most of the cell's supply of adenosine triphosphate (ATP), used as a source of chemical energy?",
      options: ["Golgi Apparatus", "Golgi Apparatus", "Mitochondrion", "Golgi Apparatus"],
    },
    {
      id: 2,
      question: "What is the powerhouse of the cell?",
      options: ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic Reticulum"],
    },
    {
      id: 3,
      question: "Which organelle is responsible for protein synthesis?",
      options: ["Golgi Apparatus", "Ribosome", "Lysosome", "Vacuole"],
    },
  ]);

  const assignmentName = "Assignemt Name";

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Handle time up - auto submit
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswerSelect = (optionIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].selectedAnswer = optionIndex;
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
    // Navigate to submission confirmation
    navigate("/student/submission");
  };

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
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                Question {currentQuestionIndex + 1}
              </h2>
              <p className="mb-6 text-base text-slate-700">{currentQuestion.question}</p>

              <div className="mb-8 space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full rounded-xl border-2 p-4 text-left transition-all ${
                      currentQuestion.selectedAnswer === index
                        ? "border-emerald-500 bg-emerald-500 text-white"
                        : "border-slate-200 bg-slate-50 text-slate-900 hover:border-emerald-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-5 w-5 rounded-full border-2 ${
                          currentQuestion.selectedAnswer === index
                            ? "border-white bg-white"
                            : "border-slate-400 bg-transparent"
                        }`}
                      >
                        {currentQuestion.selectedAnswer === index && (
                          <div className="h-full w-full rounded-full bg-emerald-500" />
                        )}
                      </div>
                      <span className="flex-1">{option}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                  className={`rounded-xl border-2 px-6 py-2 font-semibold transition ${
                    currentQuestionIndex === 0
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
                    className={`w-full rounded-xl p-3 text-left transition ${
                      index === currentQuestionIndex
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

