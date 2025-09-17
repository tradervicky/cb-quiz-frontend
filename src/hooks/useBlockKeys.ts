import { useEffect } from "react";

export function useBlockKeys() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Block refresh keys
      if ((e.ctrlKey && e.key === "r") || e.key === "F5") {
        e.preventDefault();
        alert("Refreshing is disabled during the test.");
      }

      // Block opening dev tools
      if (
        e.key === "F12" ||
        (e.ctrlKey &&
          e.shiftKey &&
          (e.key === "I" || e.key === "J" || e.key === "C")) ||
        (e.ctrlKey && e.key === "U")
      ) {
        e.preventDefault();
        alert("Developer tools are disabled during the test.");
      }

      // Block copy-paste & selection
      if (
        (e.ctrlKey &&
          (e.key === "c" || e.key === "v" || e.key === "x" || e.key === "a")) ||
        e.key === "PrintScreen"
      ) {
        e.preventDefault();
        alert("Copy/Paste is disabled during the test.");
      }

      // Block Esc (exit fullscreen)
      if (e.key === "Escape") {
        e.preventDefault();
        alert("Escape key is disabled during the test.");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
}
