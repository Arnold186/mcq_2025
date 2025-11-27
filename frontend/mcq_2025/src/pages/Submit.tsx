import React from "react";
import { Link } from "react-router-dom";

const Submit: React.FC = () => {
  return (
    <div className="container">
      <h2>Your answers have been submitted</h2>
      <p>Thank you — your submission is recorded. You can view results (if enabled) below</p>
      <Link to="/results">View Results</Link>
    </div>
  );
};

export default Submit;
