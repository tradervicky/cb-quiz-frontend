import { useEffect, useState } from "react";

// time is passed in seconds (default 15 minutes = 900s)
const useTimer = (initialTime = 15, onExpire: any) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (onExpire) onExpire();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, onExpire]);

  // Convert seconds → minutes:seconds
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return { timeLeft, minutes, seconds };
};

export default useTimer;
