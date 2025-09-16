import { useEffect } from "react";

export function useQuizProtection(onSubmit: () => void) {
  // Enter Full Screen
  const enterFullScreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if ((elem as any).webkitRequestFullscreen) {
      (elem as any).webkitRequestFullscreen();
    } else if ((elem as any).msRequestFullscreen) {
      (elem as any).msRequestFullscreen();
    }
  };

  useEffect(() => {
    // 1. Go fullscreen when quiz starts
    enterFullScreen();

    // 2. Reload protection
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "Are you sure you want to leave? Quiz will be submitted.";
      onSubmit();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    // 3. Fullscreen exit protection
    const handleFullScreenChange = () => {
      if (!document.fullscreenElement) {
        onSubmit();
      }
    };
    document.addEventListener("fullscreenchange", handleFullScreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullScreenChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullScreenChange
      );
    };
  }, []);
}
