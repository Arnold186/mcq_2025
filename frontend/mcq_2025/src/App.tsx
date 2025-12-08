import { Routes, Route, Navigate } from "react-router-dom";
import StudentLogin from "./student/login";
import StudentSignup from "./student/signup";
import StudentQuiz from "./student/quiz";
import StudentDashboard from "./student/Dashboard";
import SubmissionConfirmation from "./student/submission";
import AdminLogin from "./admin/login";
import AdminDashboard from "./admin/Dashboard";
import AdminAssignments from "./admin/Assignments";
import CreateAssignment from "./admin/CreateAssignment";
import AssignmentSettings from "./admin/AssignmentSettings";
import Students from "./admin/Students";
import Help from "./admin/Help";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/student/login" replace />} />
      <Route path="/student/login" element={<StudentLogin />} />
      <Route path="/student/signup" element={<StudentSignup />} />
      <Route path="/student/dashboard" element={<StudentDashboard />} />
      <Route path="/student/quiz" element={<StudentQuiz />} />
      <Route path="/student/submission" element={<SubmissionConfirmation />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/assignments" element={<AdminAssignments />} />
      <Route path="/admin/assignments/create" element={<CreateAssignment />} />
      <Route path="/admin/assignments/settings" element={<AssignmentSettings />} />
      <Route path="/admin/students" element={<Students />} />
      <Route path="/admin/help" element={<Help />} />
    </Routes>
  );
}

export default App;
