
/* Remove intro after animation */
window.addEventListener("load", function () {
  const intro = document.getElementById("introScreen");

  if (intro) {
    setTimeout(function () {
      intro.remove();
    }, 4100);
  }
});
