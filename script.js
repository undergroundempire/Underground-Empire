(() => {
  'use strict';

  const menuBtn = document.getElementById('menuBtn');
  const nav = document.getElementById('nav');

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const intro = document.getElementById('intro');
  const audio = document.getElementById('introAudio');
  let introClosed = false;

  function closeIntro() {
    if (introClosed) return;
    introClosed = true;

    if (intro) intro.classList.add('hidden');

    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }

  const skipBtn = document.getElementById('skipIntro');
  const enterBtn = document.getElementById('enterBtn');

  if (skipBtn) {
    skipBtn.addEventListener('click', closeIntro);
  }

  if (enterBtn) {
    enterBtn.addEventListener('click', async () => {
      if (audio) {
        try {
          audio.currentTime = 0;
          await audio.play();
        } catch (error) {
          // Audio may be unavailable.
        }
      }

      window.setTimeout(closeIntro, 2200);
    });
  }

  // Backup: intro never blocks the website.
  window.setTimeout(closeIntro, 5000);
})();
        
