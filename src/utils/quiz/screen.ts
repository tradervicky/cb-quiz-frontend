export const goFullScreen = () => {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  }
};

export const exitFullScreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  }
};
