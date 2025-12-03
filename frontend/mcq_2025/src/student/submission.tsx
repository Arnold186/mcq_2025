import React from "react";

const SubmissionConfirmation: React.FC = () => {
  const registrationNumber = "202050014";
  const score = "15/20";
  const submissionTime = new Date().toLocaleString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white shadow-2xl overflow-hidden">
          {/* Green Header Section */}
          <div
            className="relative px-8 py-12 text-center"
            style={{
              background: "linear-gradient(180deg, #55f28b 0%, #05c658 100%)",
            }}
          >
            <div className="mb-4 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg">
                <svg
                  className="h-10 w-10 text-emerald-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white">Submitted!</h1>
          </div>

          {/* White Details Section */}
          <div className="px-8 py-8">
            <div className="mb-6 grid grid-cols-2 gap-6">
              <div>
                <p className="mb-2 text-sm text-slate-600">Registration Number</p>
                <p className="text-lg font-bold text-slate-900">{registrationNumber}</p>
              </div>
              <div>
                <p className="mb-2 text-sm text-slate-600">Score</p>
                <p className="text-lg font-bold text-slate-900">{score}</p>
              </div>
            </div>

            <div className="text-center">
              <p className="mb-2 text-sm text-slate-600">Submission Time</p>
              <p className="text-lg font-bold text-slate-900">{submissionTime}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionConfirmation;

