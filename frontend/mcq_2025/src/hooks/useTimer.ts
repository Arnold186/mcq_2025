import { useEffect, useRef, useState } from "react";

export function useTimer(secondsInitial: number, onExpire?: () => void) {
  const [secondsLeft, setSecondsLeft] = useState(secondsInitial);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    setSecondsLeft(secondsInitial);
  }, [secondsInitial]);

  useEffect(() => {
    if (secondsLeft <= 0) {
      if (timerRef.current) window.clearInterval(timerRef.current);
      onExpire?.();
      return;
    }
    timerRef.current = window.setInterval(() => {
      setSecondsLeft(s => s - 1);
    }, 1000);

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [secondsLeft, onExpire]);

  const pause = () => { if (timerRef.current) window.clearInterval(timerRef.current); };
  const resume = () => {
    if (timerRef.current) return;
    timerRef.current = window.setInterval(() => setSecondsLeft(s => s - 1), 1000);
  };

  return { secondsLeft, pause, resume, setSecondsLeft };
}
