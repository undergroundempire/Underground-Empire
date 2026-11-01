
/* INTRO */

const intro = document.getElementById("intro");
const enterBtn = document.getElementById("enterBtn");
const skipBtn = document.getElementById("skipIntro");
const introAudio = document.getElementById("introAudio");

function closeIntro(){

 if(!intro) return;

 intro.classList.add("hide");

 if(introAudio){
  introAudio.pause();
  introAudio.currentTime = 0;
 }
}

if(enterBtn){
 enterBtn.addEventListener("click",closeIntro);
}

if(skipBtn){
 skipBtn.addEventListener("click",closeIntro);
}

/* MOBILE MENU */

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

if(menuBtn && nav){

 menuBtn.addEventListener("click",()=>{

  const opened = nav.classList.toggle("open");

  menuBtn.setAttribute("aria-expanded",opened);

 });

 nav.querySelectorAll("a").forEach(link=>{

  link.addEventListener("click",()=>{

   nav.classList.remove("open");

   menuBtn.setAttribute("aria-expanded","false");

  });

 });

}
