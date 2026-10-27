
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const opened = mainNav.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(opened));
    menuToggle.setAttribute(
      "aria-label",
      opened ? "Close menu" : "Open menu"
    );
    menuToggle.textContent = opened ? "×" : "☰";
  });

  mainNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open menu");
      menuToggle.textContent = "☰";
    });
  });
}

const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}

/* One search box: search the visible website text */
const siteSearch = document.getElementById("siteSearch");
const searchMessage = document.getElementById("searchMessage");

if (siteSearch && searchMessage) {
  siteSearch.addEventListener("input", () => {
    const query = siteSearch.value.trim().toLowerCase();

    if (!query) {
      searchMessage.textContent =
        "Explore the Underground Empire.";
      return;
    }

    const sections = [
      ...document.querySelectorAll(
        ".showcase, .about"
      )
    ];

    const match = sections.find(section =>
      section.textContent.toLowerCase().includes(query)
    );

    searchMessage.textContent = match
      ? "Found: " + match.querySelector("h2").textContent
      : "No matching section found.";
  });
}
