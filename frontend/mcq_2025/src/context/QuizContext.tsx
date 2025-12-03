import React, { createContext, useContext, useMemo, useState } from "react";

type AnswerMap = Record<string, string>;

export interface QuizContextValue {
  currentQuestion: number;
  setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>;
  answers: AnswerMap;
  setAnswers: React.Dispatch<React.SetStateAction<AnswerMap>>;
}

const QuizContext = createContext<QuizContextValue | undefined>(undefined);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});

  const value = useMemo(
    () => ({
      currentQuestion,
      setCurrentQuestion,
      answers,
      setAnswers,
    }),
    [currentQuestion, answers],
  );

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

export const useQuiz = (): QuizContextValue => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used inside a QuizProvider");
  }
  return context;
};

