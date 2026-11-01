<script>
(function(){
  const intro = document.getElementById("intro");
  const audio = document.getElementById("introAudio");
  const enterBtn = document.getElementById("enterBtn");
  const skipBtn = document.getElementById("skipIntro");
  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");

  let closed = false;

  function closeIntro(){
    if(closed) return;
    closed = true;
    intro.classList.add("hidden");
    audio.pause();
  }

  enterBtn.addEventListener("click", function(){
    if(closed) return;
    audio.currentTime = 0;
    audio.play().catch(function(error){
      console.log("Audio could not play:", error);
    });
    closeIntro();
  });

  skipBtn.addEventListener("click", closeIntro);

  setTimeout(closeIntro, 2000);

  menuBtn.addEventListener("click", function(){
    const opened = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(opened));
  });

  nav.querySelectorAll("a").forEach(function(link){
    link.addEventListener("click", function(){
      nav.classList.remove("open");
      menuBtn.setAttribute("aria-expanded","false");
    });
  });
})();
</script>
