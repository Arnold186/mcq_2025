import React, { createContext, useContext, useState } from "react";
import type { Question } from "../types/Question";
import type { Answer } from "../types/Attempt";

interface QuizContextType {
  questions: Question[];
  setQuestions: (q: Question[]) => void;
  answers: Answer[];
  setAnswer: (questionId: string, selected: number | null) => void;
  currentIndex: number;
  setCurrentIndex: (i: number) => void;
  learnerReg: string;
  setLearnerReg: (r: string) => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [learnerReg, setLearnerReg] = useState("");

  const setAnswer = (questionId: string, selected: number | null) => {
    setAnswers(prev => {
      const found = prev.find(a => a.questionId === questionId);
      if (found) {
        return prev.map(a => a.questionId === questionId ? { ...a, selected } : a);
      }
      return [...prev, { questionId, selected }];
    });
  };

  return (
    <QuizContext.Provider value={{ questions, setQuestions, answers, setAnswer, currentIndex, setCurrentIndex, learnerReg, setLearnerReg }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error("useQuiz must be used inside QuizProvider");
  return ctx;
};
