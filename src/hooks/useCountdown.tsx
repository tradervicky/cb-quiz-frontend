import { useEffect, useState } from "react";

const useCountDown = (
  initialSeconds: number,
  onExpire: () => void,
  attemptId: string
) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    // Restore saved time
    const saved = localStorage.getItem(`timer-${attemptId}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      const now = Date.now();
      const remaining = parsed.expiry - now;
      setSecondsLeft(Math.max(remaining / 1000, 0));
    } else {
      // Save expiry time
      localStorage.setItem(
        `timer-${attemptId}`,
        JSON.stringify({ expiry: Date.now() + initialSeconds * 1000 })
      );
    }

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onExpire();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [attemptId]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return { minutes, seconds };
};

export default useCountDown;
