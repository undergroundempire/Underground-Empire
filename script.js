
/* UNDERGROUND EMPIRE - MAIN JAVASCRIPT */

(() => {
  "use strict";

  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");
  const intro = document.getElementById("intro");
  const audio = document.getElementById("introAudio");
  const enterBtn = document.getElementById("enterBtn");
  const skipBtn = document.getElementById("skipIntro");

  // Mobile menu
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      const opened = nav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(opened));
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Close intro and show website
  function closeIntro(stopAudio = false) {
    if (!intro) return;

    intro.classList.add("hidden");
    intro.setAttribute("aria-hidden", "true");

    intro.style.opacity = "0";
    intro.style.visibility = "hidden";
    intro.style.pointerEvents = "none";

    if (stopAudio && audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }

  // ENTER button
  if (enterBtn) {
    enterBtn.addEventListener("click", () => {
      closeIntro(false);

      if (audio) {
        audio.volume = 1;
        audio.play().catch(error => {
          console.log("Audio error:", error);
        });
      }
    });
  }

  // SKIP button
  if (skipBtn) {
    skipBtn.addEventListener("click", () => {
      closeIntro(true);
    });
  }

  // Automatic safety close after 12 seconds
  window.setTimeout(() => {
    closeIntro(true);
  }, 12000);

  // Footer year
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

})();
