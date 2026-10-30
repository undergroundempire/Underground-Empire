(() => {
 const menuBtn=document.getElementById('menuBtn');
 const nav=document.getElementById('nav');
 menuBtn?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(open));});
 nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuBtn?.setAttribute('aria-expanded','false');}));
 const intro=document.getElementById('intro');
 const audio=document.getElementById('introAudio');
 const close=()=>{intro?.classList.add('hidden');try{audio?.pause();}catch(e){}};
 document.getElementById('skipIntro')?.addEventListener('click',close);
 document.getElementById('enterBtn')?.addEventListener('click',async()=>{
   if(audio){try{audio.currentTime=0;await audio.play();}catch(e){/* Audio file may not have been added yet. */}}
   window.setTimeout(close,4200);
 });
 // Never hold the actual website hostage if the visitor does not tap.
 window.setTimeout(close,4500);
})();
