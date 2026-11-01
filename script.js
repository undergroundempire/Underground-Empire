
(() => {
  const intro = document.getElementById("intro");
  const audio = document.getElementById("introAudio");
  const enterBtn = document.getElementById("enterBtn");
  const skipBtn = document.getElementById("skipIntro");

  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");

  let introOpened = false;

  function openWebsite() {
    if (introOpened) return;
    introOpened = true;

    if (intro) {
      intro.classList.add("hidden");
    }
    audio?.pause();
  }

  // Enter button
  enterBtn?.addEventListener("click", () => {
    openWebsite();
  });

  // Skip button
  skipBtn?.addEventListener("click", () => {
    openWebsite();
  });

  // Automatic opening after 2 seconds
  if (intro) {
    setTimeout(openWebsite, 2000);
  }

  // Mobile menu
  menuBtn?.addEventListener("click", () => {
    const isOpen = nav?.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(!!isOpen));
  });
})();
