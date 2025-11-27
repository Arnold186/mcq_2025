import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import { fetchAssignmentStatus } from "../utils/api";

const Home: React.FC = () => {
  const { setLearnerReg } = useQuiz();
  const [reg, setReg] = useState("");
  const [assignmentOpen, setAssignmentOpen] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // check assignment status
    fetchAssignmentStatus().then(res => setAssignmentOpen(res.data.open)).catch(() => setAssignmentOpen(false));
  }, []);

  const start = () => {
    if (!reg.trim()) return alert("Enter registration number");
    if (assignmentOpen === false) return alert("Assignment is currently closed");
    setLearnerReg(reg.trim());
    navigate("/quiz", { state: { reg } });
  };

  return (
    <div className="container">
      <h1>MCQ Assignment</h1>
      <input placeholder="Registration number" value={reg} onChange={e => setReg(e.target.value)} />
      <button onClick={start}>Start</button>
      {assignmentOpen === null ? <p>Checking assignment status...</p> : assignmentOpen ? <p>Assignment is open</p> : <p>Assignment is closed</p>}
    </div>
  );
};

export default Home;
