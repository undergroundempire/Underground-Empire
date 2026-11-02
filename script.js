
(() => {
  const intro = document.getElementById("intro");
  const audio = document.getElementById("introAudio");
  const enterBtn = document.getElementById("enterBtn");
  const skipBtn = document.getElementById("skipIntro");

  function openWebsite() {
    intro?.classList.add("hidden");
  }

  enterBtn?.addEventListener("click", () => {
    openWebsite();

    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {
        console.log("Music file could not be played.");
      });
    }
  });

  skipBtn?.addEventListener("click", () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    openWebsite();
  });
})();
