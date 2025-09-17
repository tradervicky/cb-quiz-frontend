import { useEffect, useState } from "react";

export function useDetectDevTools() {
  const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);

  useEffect(() => {
    const detectDevTools = () => {
      const threshold = 160; // difference in px when DevTools is docked
      const devToolsOpened =
        window.outerWidth - window.innerWidth > threshold ||
        window.outerHeight - window.innerHeight > threshold;

      setIsDevToolsOpen(devToolsOpened);
    };

    // Check immediately
    detectDevTools();

    // Keep checking
    const interval = setInterval(detectDevTools, 1000);

    return () => clearInterval(interval);
  }, []);

  return isDevToolsOpen;
}
