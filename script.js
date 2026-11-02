
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



/* ===== TYPING ANIMATION ===== */

.typing{
  text-align:center;
  color:#fff;
  font-size:22px;
  font-weight:700;
  letter-spacing:1px;
  margin-top:15px;
  text-shadow:0 0 10px red;
}

.cursor{
  color:#ff0000;
  animation:blink .8s infinite;
}

@keyframes blink{
  50%{opacity:0;}
}

@media(max-width:768px){
  .typing{
    font-size:17px;
  }
}
