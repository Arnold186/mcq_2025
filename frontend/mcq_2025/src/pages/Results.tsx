import React, { useEffect, useState } from "react";
import { fetchAllAttempts } from "../utils/api";

const Results: React.FC = () => {
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    fetchAllAttempts().then(r => setRows(r.data)).catch(() => setRows([]));
  }, []);

  return (
    <div className="container">
      <h2>Results</h2>
      {rows.length === 0 ? <p>No results yet.</p> : (
        <table>
          <thead><tr><th>Reg</th><th>Score</th><th>Submitted</th></tr></thead>
          <tbody>
            {rows.map((r: any) => (
              <tr key={r._id}><td>{r.learner?.regNumber}</td><td>{r.score ?? "-"}</td><td>{new Date(r.submittedAt).toLocaleString()}</td></tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Results;
