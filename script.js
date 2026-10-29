const menuBtn=document.getElementById('menuBtn');const nav=document.getElementById('nav');menuBtn?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(open));});document.querySelectorAll('#nav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuBtn?.setAttribute('aria-expanded','false');}));
// Demo search filters media entries added in this browser. It does not upload files to a public server.
const search=document.getElementById('search');search?.addEventListener('input',()=>{const q=search.value.toLowerCase();document.querySelectorAll('.media-row,.photo-grid img,.short-card').forEach(el=>{el.hidden=!el.textContent.toLowerCase().includes(q)&&!(el.getAttribute('alt')||'').toLowerCase().includes(q);});});


// INTRO: fast exit, optional 2-second audio
(function () {
  const screen = document.getElementById("intro-screen");
  const button = document.getElementById("enter-btn");
  const audio = document.getElementById("intro-audio");

  if (!screen || !button || !audio) return;

  let closed = false;

  function closeIntro() {
    if (closed) return;
    closed = true;
    clearTimeout(timer);
    audio.pause();
    screen.classList.add("intro-hide");

    setTimeout(function () {
      screen.remove();
    }, 400);
  }

  button.addEventListener("click", function () {
    audio.currentTime = 0;

    const playback = audio.play();

    if (playback && playback.then) {
      playback.then(function () {
        setTimeout(closeIntro, 2000);
      }).catch(closeIntro);
    } else {
      setTimeout(closeIntro, 2000);
    }
  });

  // Website opens automatically if visitor does not tap
  const timer = setTimeout(closeIntro, 2200);
})();
