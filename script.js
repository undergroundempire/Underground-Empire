
document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.getElementById("menuBtn");
  const mainNav = document.getElementById("mainNav");
  const songSearch = document.getElementById("songSearch");
  const songList = document.getElementById("songList");
  const year = document.getElementById("year");

  // Current copyright year
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Mobile navigation menu
  if (menuBtn && mainNav) {
    menuBtn.addEventListener("click", function () {
      const isOpen = mainNav.classList.toggle("open");

      menuBtn.setAttribute("aria-expanded", String(isOpen));
      menuBtn.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
      );

      menuBtn.textContent = isOpen ? "✕" : "☰";
    });

    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Open menu");
        menuBtn.textContent = "☰";
      });
    });
  }

  // Search songs by title or artist
  if (songSearch && songList) {
    songSearch.addEventListener("input", function () {
      const query = songSearch.value.trim().toLowerCase();
      const cards = songList.querySelectorAll(".content-card");

      cards.forEach(function (card) {
        const text = card.textContent.toLowerCase();
        card.hidden = !text.includes(query);
      });
    });
  }

  // Crown animation is handled by CSS.
});
