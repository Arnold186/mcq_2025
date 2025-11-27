import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import Timer from "../components/Timer";
import { useQuiz } from "../context/QuizContext";
import { fetchQuestions, submitAttempt } from "../utils/api";
import { useTimer } from "../hooks/useTimer";

const Quiz: React.FC = () => {
  const { questions, setQuestions, currentIndex, setCurrentIndex, answers, learnerReg } = useQuiz();
  const [durationSeconds, setDurationSeconds] = useState(20 * 60); // default 20 min
  const navigate = useNavigate();

  useEffect(() => {
    // fetch questions and assignment duration
    Promise.all([fetchQuestions()]).then(([qRes]) => {
      setQuestions(qRes.data);
      // optional: fetch assignment duration from /assignment endpoint
      // setDurationSeconds(...)
    }).catch(err => {
      console.error(err);
      alert("Failed to load questions");
      navigate("/");
    });
  }, []);

  const onExpire = async () => {
    await handleSubmit();
  };

  const { secondsLeft } = useTimer(durationSeconds, onExpire);

  const handleNext = () => {
    setCurrentIndex(Math.min(currentIndex + 1, questions.length - 1));
  };

  const handlePrev = () => {
    setCurrentIndex(Math.max(currentIndex - 1, 0));
  };

  const handleSubmit = async () => {
    // build payload
    const payload = {
      learner: { regNumber: learnerReg },
      answers: answers,
      submittedAt: new Date().toISOString()
    };
    try {
      await submitAttempt(payload);
      navigate("/submit");
    } catch (err) {
      console.error(err);
      alert("Failed to submit. Try again.");
    }
  };

  if (!questions.length) return <div>Loading questions...</div>;

  return (
    <div className="quiz-page">
      <Timer secondsLeft={secondsLeft} />
      <QuestionCard question={questions[currentIndex]} index={currentIndex} />
      <div className="nav-buttons">
        <button onClick={handlePrev} disabled={currentIndex === 0}>Previous</button>
        <button onClick={handleNext} disabled={currentIndex === questions.length - 1}>Next</button>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div className="progress">Question {currentIndex + 1} / {questions.length}</div>
    </div>
  );
};

export default Quiz;
