
(() => {
  const menuBtn = document.getElementById('menuBtn');
  const nav = document.getElementById('nav');

  // Mobile menu
  menuBtn?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  nav?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      nav.classList.remove('open');
      menuBtn?.setAttribute('aria-expanded', 'false');
    });
  });

  // Intro audio
  const intro = document.getElementById('intro');
  const audio = document.getElementById('introAudio');
  const enterBtn = document.getElementById('enterBtn');
  const skipBtn = document.getElementById('skipIntro');

  let entered = false;

  const closeIntro = () => {
    intro?.classList.add('hidden');
  };

  enterBtn?.addEventListener('click', async () => {
    if (entered) return;
    entered = true;

    if (!audio) {
      closeIntro();
      return;
    }

    try {
      audio.currentTime = 0;
      await audio.play();

      audio.addEventListener('ended', closeIntro, { once: true });

    } catch (error) {
      console.log('Intro audio error:', error);
      closeIntro();
    }
  });

  // Skip intro
  skipBtn?.addEventListener('click', () => {
    audio?.pause();
    if (audio) audio.currentTime = 0;
    closeIntro();
  });

})();
