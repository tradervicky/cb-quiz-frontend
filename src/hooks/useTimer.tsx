import { useEffect, useState } from "react";

export function useTimer(durationInMinutes: number, onTimeUp: () => void) {
  const initialSeconds =
    parseInt(sessionStorage.getItem("quizRemainingSeconds") || "0", 10) ||
    durationInMinutes * 60;

  const [timeLeft, setTimeLeft] = useState<number>(initialSeconds);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          sessionStorage.removeItem("quizRemainingSeconds");
          onTimeUp();
          return 0;
        }
        const updated = prev - 1;
        sessionStorage.setItem("quizRemainingSeconds", updated.toString());
        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return { minutes, seconds, timeLeft };
}
