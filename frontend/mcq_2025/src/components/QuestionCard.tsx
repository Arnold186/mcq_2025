import React from "react";
import type { Question } from "../types/Question";
import { useQuiz } from "../context/QuizContext";

const QuestionCard: React.FC<{ question: Question; index: number }> = ({ question, index }) => {
  const { answers, setAnswer } = useQuiz();

  const currentAnswer = answers.find(a => a.questionId === question._id)?.selected ?? null;

  return (
    <div className="card">
      <h3>{index + 1}. {question.questionText}</h3>
      <ul>
        {question.options.map((opt, i) => (
          <li key={i}>
            <label>
              <input
                type="radio"
                name={question._id}
                checked={currentAnswer === i}
                onChange={() => setAnswer(question._id, i)}
              />
              <span style={{ marginLeft: 8 }}>{opt}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionCard;
