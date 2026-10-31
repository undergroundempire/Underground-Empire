(() => {
  const intro = document.getElementById("intro");
  const audio = document.getElementById("introAudio");
  const enterBtn = document.getElementById("enterBtn");
  const skipBtn = document.getElementById("skipIntro");

  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");

  function openWebsite() {
    if (intro) {
      intro.classList.add("hidden");
    }
  }

  enterBtn?.addEventListener("click", () => {
    if (audio) {
      audio.play().catch(error => {
        console.log("Audio error:", error);
      });
    }

    openWebsite();
  });

  skipBtn?.addEventListener("click", () => {
    audio?.pause();
    openWebsite();
  });

  menuBtn?.addEventListener("click", () => {
    const isOpen = nav?.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(!!isOpen));
  });
})();
