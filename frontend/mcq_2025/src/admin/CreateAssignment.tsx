import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

interface Question {
  id: number;
  questionText: string;
  options: string[];
  correctAnswer: number;
}

const CreateAssignment: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [assignmentName, setAssignmentName] = useState("Assignment Name");
  const [isEditingName, setIsEditingName] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      questionText:
        "Which of the following organelles is primarily responsible for generating most of the cell's supply of adenosine triphosphate (ATP), used as a source of chemical energy?",
      options: ["Golgi Apparatus", "Golgi Apparatus", "Mitochondrion", "Golgi Apparatus"],
      correctAnswer: 2,
    },
  ]);
  const [newQuestion, setNewQuestion] = useState({
    questionText: "",
    options: ["", "", "", ""],
    correctAnswer: 1,
  });
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);

  const handleSaveQuestion = () => {
    if (newQuestion.questionText.trim() && newQuestion.options.every((opt) => opt.trim())) {
      const question: Question = {
        id: questions.length + 1,
        questionText: newQuestion.questionText,
        options: newQuestion.options,
        correctAnswer: newQuestion.correctAnswer,
      };
      setQuestions([...questions, question]);
      setNewQuestion({
        questionText: "",
        options: ["", "", "", ""],
        correctAnswer: 1,
      });
      setIsAddingQuestion(false);
    }
  };

  const handleDeleteQuestion = (id: number) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const handlePublish = () => {
    navigate("/admin/assignments/settings");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <Sidebar currentPath={location.pathname} />
      <div className="flex-1 p-8">
        {/* Assignment Header */}
        <div className="bg-slate-200 rounded-lg p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {isEditingName ? (
              <input
                type="text"
                value={assignmentName}
                onChange={(e) => setAssignmentName(e.target.value)}
                onBlur={() => setIsEditingName(false)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setIsEditingName(false);
                }}
                className="text-xl font-bold bg-white px-3 py-1 rounded border border-slate-300 focus:outline-none focus:border-emerald-500"
                autoFocus
              />
            ) : (
              <h1
                className="text-xl font-bold text-slate-900 cursor-pointer"
                onClick={() => setIsEditingName(true)}
              >
                {assignmentName}
              </h1>
            )}
            <button className="text-slate-600 hover:text-slate-900">✏️</button>
            <button className="text-slate-600 hover:text-red-600">🗑️</button>
          </div>
          <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition">
            Assignment Mode
          </button>
        </div>

        {/* Add Question Section */}
        {isAddingQuestion ? (
          <div className="bg-slate-200 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xl">
                +
              </div>
              <span className="ml-3 font-semibold text-slate-900">Add Question</span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Question Text
                </label>
                <textarea
                  className="w-full rounded-lg border border-slate-300 p-3 focus:outline-none focus:border-emerald-500"
                  rows={4}
                  placeholder="Enter question text..."
                  value={newQuestion.questionText}
                  onChange={(e) =>
                    setNewQuestion({ ...newQuestion, questionText: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">Options</label>
                <div className="space-y-2">
                  {newQuestion.options.map((option, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="correctAnswer"
                        checked={newQuestion.correctAnswer === index}
                        onChange={() => setNewQuestion({ ...newQuestion, correctAnswer: index })}
                        className="w-5 h-5 text-emerald-500"
                      />
                      <input
                        type="text"
                        className="flex-1 rounded-lg border border-slate-300 p-2 focus:outline-none focus:border-emerald-500"
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...newQuestion.options];
                          newOptions[index] = e.target.value;
                          setNewQuestion({ ...newQuestion, options: newOptions });
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleSaveQuestion}
                className="w-full bg-emerald-500 text-white py-3 rounded-lg font-semibold hover:bg-emerald-600 transition"
              >
                Save Question
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-slate-200 rounded-lg p-6 mb-6 text-center">
            <button
              onClick={() => setIsAddingQuestion(true)}
              className="inline-flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xl">
                +
              </div>
              <span className="font-semibold text-slate-900">Add Question</span>
            </button>
          </div>
        )}

        {/* Existing Questions */}
        {questions.map((question) => (
          <div key={question.id} className="bg-purple-100 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900">Question {question.id}</h3>
              <div className="flex gap-3">
                <button className="text-slate-600 hover:text-slate-900">✏️</button>
                <button
                  onClick={() => handleDeleteQuestion(question.id)}
                  className="text-slate-600 hover:text-red-600"
                >
                  🗑️
                </button>
              </div>
            </div>
            <p className="text-slate-700 mb-4">{question.questionText}</p>
            <div className="space-y-2">
              {question.options.map((option, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-3 rounded-lg ${
                    index === question.correctAnswer
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-200 text-slate-700"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 ${
                      index === question.correctAnswer
                        ? "border-white bg-white"
                        : "border-slate-400 bg-transparent"
                    }`}
                  >
                    {index === question.correctAnswer && (
                      <div className="w-full h-full rounded-full bg-emerald-500" />
                    )}
                  </div>
                  <span>{option}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Publish Button */}
        <div className="mt-8">
          <button
            onClick={handlePublish}
            className="w-full bg-emerald-500 text-white py-4 rounded-lg font-semibold text-lg hover:bg-emerald-600 transition shadow-lg"
          >
            Publish Assignment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAssignment;

