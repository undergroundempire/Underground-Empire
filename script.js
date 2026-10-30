from pathlib import Path

content = r"""/* Underground Empire - main script.js
   Works with these HTML IDs:
   menuBtn, nav, intro, introAudio, enterBtn, skipIntro
   Optional intro logo ID: introLogo
*/

(() => {
  "use strict";

  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");

  const intro = document.getElementById("intro");
  const introLogo = document.getElementById("introLogo"); // optional
  const audio = document.getElementById("introAudio");
  const enterBtn = document.getElementById("enterBtn");
  const skipBtn = document.getElementById("skipIntro");

  let introFinished = false;
  let audioStarted = false;

  // Mobile navigation
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Hide intro and stop its audio when the visitor skips it.
  function closeIntro(stopAudio = true) {
    if (introFinished) return;
    introFinished = true;

    if (intro) {
      intro.classList.add("hidden");
      intro.setAttribute("aria-hidden", "true");
    }

    if (stopAudio && audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }

  // Enter is a real user tap, so mobile browsers can allow audio playback.
  if (enterBtn) {
    enterBtn.addEventListener("click", async () => {
      if (introFinished) return;

      if (audio && !audioStarted) {
        try {
          audio.volume = 1;
          audio.currentTime = 0;
          await audio.play();
          audioStarted = true;

          // Keep the intro visible until the audio finishes.
          audio.addEventListener("ended", () => closeIntro(false), { once: true });
          audio.addEventListener("error", () => closeIntro(false), { once: true });
          return;
        } catch (error) {
          // If audio cannot play, still let the visitor enter the website.
          console.warn("Intro audio could not play:", error);
        }
      }

      closeIntro(false);
    });
  }

  // Skip button
  if (skipBtn) {
    skipBtn.addEventListener("click", () => closeIntro(true));
  }

  // If there is no Enter button, don't trap visitors on the intro screen.
  if (!enterBtn && intro) {
    window.setTimeout(() => closeIntro(true), 5000);
  }

  // Make an optional logo element available for CSS animation.
  if (introLogo) {
    introLogo.classList.add("intro-logo-ready");
  }

  // Footer year (optional)
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
"""
path = Path("/mnt/data/script.js")
path.write_text(content, encoding="utf-8")
print(f"Created: {path} ({path.stat().st_size} bytes)")
