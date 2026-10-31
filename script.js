
(() => {
 const menuBtn = document.getElementById('menuBtn');
 const nav = document.getElementById('nav');

 menuBtn?.addEventListener('click', () => {
   const open = nav.classList.toggle('open');
   menuBtn.setAttribute('aria-expanded', String(open));
 });

 nav?.querySelectorAll('a').forEach(a =>
   a.addEventListener('click', () => {
     nav.classList.remove('open');
     menuBtn?.setAttribute('aria-expanded', 'false');
   })
 );

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

   if (audio) {
     try {
       audio.currentTime = 0;
       await audio.play();

       audio.onended = closeIntro;
     } catch (e) {
       closeIntro();
     }
   } else {
     closeIntro();
   }
 });

 skipBtn?.addEventListener('click', () => {
   if (audio) {
     audio.pause();
     audio.currentTime = 0;
   }
   closeIntro();
 });
})();
