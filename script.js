
(() => {
  'use strict';

  const intro = document.getElementById('intro');
  const audio = document.getElementById('introAudio');
  const enterBtn = document.getElementById('enterBtn');
  const skipBtn = document.getElementById('skipIntro');

  function revealWebsite() {
    if (intro) intro.classList.add('hidden');
  }

  // ENTER: music starts from the user's click.
  if (enterBtn) {
    enterBtn.addEventListener('click', async () => {
      if (audio) {
        try {
          audio.currentTime = 0;
          await audio.play();
        } catch (error) {
          // Website still opens if audio is unavailable.
        }
      }
      revealWebsite();
    });
  }

  // SKIP: open website without intro music.
  if (skipBtn) {
    skipBtn.addEventListener('click', () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      revealWebsite();
    });
  }

  // Safety fallback.
  window.setTimeout(revealWebsite, 12000);
})();
