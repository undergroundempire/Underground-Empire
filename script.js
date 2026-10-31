
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

  const intro = document.getElementById('intro');
const audio = document.getElementById('introAudio');
const enterBtn = document.getElementById('enterBtn');
const skipBtn = document.getElementById('skipIntro');

enterBtn?.addEventListener('click', async () => {
  if (!audio) {
    intro?.classList.add('hidden');
    return;
  }

  try {
    audio.currentTime = 0;
    await audio.play();
  } catch (error) {
    console.log('Audio error:', error);
  }

  intro?.classList.add('hidden');
});

skipBtn?.addEventListener('click', () => {
  audio?.pause();
  if (audio) audio.currentTime = 0;
  intro?.classList.add('hidden');
});
