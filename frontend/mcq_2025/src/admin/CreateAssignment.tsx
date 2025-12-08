import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { FaEdit, FaTrash } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlinePlusCircle } from "react-icons/ai";

interface Question {
  id: number;
  questionText: string;
  options: string[];
  correctAnswers: number[]; // Changed to array for multi-select
  marks: number;
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
      correctAnswers: [2],
      marks: 5,
    },
  ]);
  const [newQuestion, setNewQuestion] = useState<{
    questionText: string;
    options: string[];
    correctAnswers: number[];
    marks: number;
  }>({
    questionText: "",
    options: ["", ""], // Start with 2 options
    correctAnswers: [],
    marks: 1,
  });
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);

  const handleSaveQuestion = () => {
    if (
      newQuestion.questionText.trim() &&
      newQuestion.options.every((opt) => opt.trim()) &&
      newQuestion.correctAnswers.length > 0
    ) {
      const question: Question = {
        id: questions.length + 1,
        questionText: newQuestion.questionText,
        options: newQuestion.options,
        correctAnswers: newQuestion.correctAnswers,
        marks: newQuestion.marks,
      };
      setQuestions([...questions, question]);
      setNewQuestion({
        questionText: "",
        options: ["", ""],
        correctAnswers: [],
        marks: 1,
      });
      setIsAddingQuestion(false);
    } else {
      alert("Please fill all fields, ensure options are not empty, and select at least one correct answer.");
    }
  };

  const handleDeleteQuestion = (id: number) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const handleAddOption = () => {
    setNewQuestion({
      ...newQuestion,
      options: [...newQuestion.options, ""],
    });
  };

  const handleRemoveOption = (index: number) => {
    if (newQuestion.options.length > 2) {
      const updatedOptions = newQuestion.options.filter((_, i) => i !== index);
      // Clean up correct answers indices
      // Simpler approach: Remove index, and re-map indices > index
      const updatedCorrectAnswers = newQuestion.correctAnswers
        .filter(ans => ans !== index)
        .map(ans => ans > index ? ans - 1 : ans);

      setNewQuestion({
        ...newQuestion,
        options: updatedOptions,
        correctAnswers: updatedCorrectAnswers
      });
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...newQuestion.options];
    newOptions[index] = value;
    setNewQuestion({ ...newQuestion, options: newOptions });
  };

  const toggleCorrectAnswer = (index: number) => {
    const currentCorrect = newQuestion.correctAnswers;
    if (currentCorrect.includes(index)) {
      setNewQuestion({
        ...newQuestion,
        correctAnswers: currentCorrect.filter((i) => i !== index),
      });
    } else {
      setNewQuestion({
        ...newQuestion,
        correctAnswers: [...currentCorrect, index],
      });
    }
  };

  const handlePublish = () => {
    // Pass questions and assignment name to settings page
    navigate("/admin/assignments/settings", {
      state: {
        questions,
        assignmentName
      }
    });
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
            <button className="text-slate-600 hover:text-slate-900"><FaEdit /></button>
            <button className="text-slate-600 hover:text-red-600"><RiDeleteBin6Line /></button>
          </div>
          <button
            onClick={handlePublish}
            className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition">
            Assignment Mode
          </button>
        </div>

        {/* Add Question Section */}
        {isAddingQuestion ? (
          <div className="bg-slate-200 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xl">
                <AiOutlinePlusCircle />
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Marks
                  </label>
                  <input
                    type="number"
                    min="1"
                    className="w-full rounded-lg border border-slate-300 p-3 focus:outline-none focus:border-emerald-500"
                    value={newQuestion.marks}
                    onChange={(e) =>
                      setNewQuestion({ ...newQuestion, marks: parseInt(e.target.value) || 0 })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">Options (Select correct answers)</label>
                <div className="space-y-2">
                  {newQuestion.options.map((option, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={newQuestion.correctAnswers.includes(index)}
                        onChange={() => toggleCorrectAnswer(index)}
                        className="w-5 h-5 text-emerald-500 rounded focus:ring-emerald-500"
                      />
                      <input
                        type="text"
                        className="flex-1 rounded-lg border border-slate-300 p-2 focus:outline-none focus:border-emerald-500"
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                      />
                      {newQuestion.options.length > 2 && (
                        <button
                          onClick={() => handleRemoveOption(index)}
                          className="text-red-500 hover:text-red-700 p-2"
                        >
                          <FaTrash size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleAddOption}
                  className="mt-3 text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                >
                  <AiOutlinePlusCircle /> Add Option
                </button>
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
              <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
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
              <div className="flex items-center gap-4">
                <h3 className="font-bold text-slate-900">Question {question.id}</h3>
                <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2 py-1 rounded">
                  {question.marks} Marks
                </span>
                {question.correctAnswers.length > 1 && (
                  <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    Multi-Select
                  </span>
                )}
              </div>
              <div className="flex gap-3">
                <button className="text-slate-600 hover:text-slate-900"><FaEdit /></button>
                <button
                  onClick={() => handleDeleteQuestion(question.id)}
                  className="text-slate-600 hover:text-red-600"
                >
                  <RiDeleteBin6Line />
                </button>
              </div>
            </div>
            <p className="text-slate-700 mb-4">{question.questionText}</p>
            <div className="space-y-2">
              {question.options.map((option, index) => {
                const isCorrect = question.correctAnswers.includes(index);
                return (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-lg ${isCorrect
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-200 text-slate-700"
                      }`}
                  >
                    <div
                      className={`w-5 h-5 flex items-center justify-center rounded border-2 ${isCorrect
                        ? "border-white bg-white"
                        : "border-slate-400 bg-transparent"
                        }`}
                    >
                      {isCorrect && (
                        <div className="w-3 h-3 bg-emerald-500 rounded-sm" />
                      )}
                    </div>
                    <span>{option}</span>
                  </div>
                )
              })}
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
    </div >
  );
};

export default CreateAssignment;

