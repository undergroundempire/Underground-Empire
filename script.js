
// ===============================
// INTRO SECTION START
// ===============================

const intro = document.getElementById("intro");
const enterBtn = document.getElementById("enterBtn");
const skipBtn = document.getElementById("skipBtn");
const introAudio = document.getElementById("introAudio");

// Hide intro and show main website
function closeIntro() {
  intro.classList.add("hide");

  if (introAudio) {
    introAudio.pause();
    introAudio.currentTime = 0;
  }
}

// ENTER BUTTON
// Music starts after the user taps Enter.
// Intro closes when the music finishes.

enterBtn.addEventListener("click", function () {

  if (!introAudio) {
    closeIntro();
    return;
  }

  introAudio.currentTime = 0;

  introAudio.play()
    .then(function () {

      enterBtn.disabled = true;
      enterBtn.textContent = "WELCOME TO THE EMPIRE";

      introAudio.onended = function () {
        closeIntro();
      };

    })
    .catch(function () {

      // If music cannot play, still enter the website.
      closeIntro();

    });

});

// SKIP BUTTON
skipBtn.addEventListener("click", function () {
  closeIntro();
});

// ===============================
// INTRO SECTION END
// ===============================


// ===============================
// MOBILE MENU START
// ===============================

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

if (menuBtn && nav) {

  menuBtn.addEventListener("click", function () {
    nav.classList.toggle("show");
  });

  // Close menu after selecting a link
  nav.querySelectorAll("a").forEach(function (link) {

    link.addEventListener("click", function () {
      nav.classList.remove("show");
    });

  });

}

// ===============================
// MOBILE MENU END
// ===============================
