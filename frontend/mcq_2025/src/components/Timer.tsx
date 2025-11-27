import React from "react";

const format = (s: number) => {
  const mm = Math.floor(s / 60).toString().padStart(2, "0");
  const ss = (s % 60).toString().padStart(2, "0");
  return `${mm}:${ss}`;
};

const Timer: React.FC<{ secondsLeft: number }> = ({ secondsLeft }) => {
  return <div className="timer">Time left: {format(secondsLeft)}</div>;
};

export default Timer;
