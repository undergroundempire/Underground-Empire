(() => {
  "use strict";

  const $ = (selector) => document.querySelector(selector);

  const loginModal = $("#loginModal");
  const adminPanel = $("#adminPanel");
  const loginForm = $("#loginForm");
  const uploadForm = $("#uploadForm");
  const searchInput = $("#search");
  const year = $("#year");

  const mediaGrids = {
    songs: $("#songGrid"),
    videos: $("#videoGrid"),
    photos: $("#photoGrid")
  };

  let mediaItems = [];
  let objectUrls = [];
  let adminLoggedIn = false;

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  function show(element) {
    if (!element) return;
    element.classList.remove("hidden");
    element.classList.add("show");
    element.setAttribute("aria-hidden", "false");
  }

  function hide(element) {
    if (!element) return;
    element.classList.add("hidden");
    element.classList.remove("show");
    element.setAttribute("aria-hidden", "true");
  }

  function message(text) {
    const output = $("#uploadMessage");
    if (output) output.textContent = text;
  }

  function openLogin() {
    show(loginModal);
  }

  function closeLogin() {
    hide(loginModal);
  }

  function openAdmin() {
    if (!adminLoggedIn) {
      openLogin();
      return;
    }
    show(adminPanel);
  }

  function closeAdmin() {
    hide(adminPanel);
  }

  $("#openLogin")?.addEventListener("click", openLogin);
  $("#uploadCta")?.addEventListener("click", openLogin);
  $("#loginClose")?.addEventListener("click", closeLogin);
  $("#closeLogin")?.addEventListener("click", closeLogin);
  $("#adminClose")?.addEventListener("click", closeAdmin);
  $("#closeAdmin")?.addEventListener("click", closeAdmin);
  $("#adminButton")?.addEventListener("click", openAdmin);

  document.querySelectorAll("[data-admin]").forEach((button) => {
    button.addEventListener("click", openAdmin);
  });

  loginModal?.addEventListener("click", (event) => {
    if (event.target === loginModal) closeLogin();
  });

  loginForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = ($("#username")?.value || "").trim();
    const password = ($("#password")?.value || "").trim();

    if (username === "admin" && password === "Empire@2026") {
      adminLoggedIn = true;
      closeLogin();
      openAdmin();

      const form = $("#loginForm");
      if (form) form.reset();
    } else {
      alert("Incorrect username or password.");
    }
  });

  $("#logout")?.addEventListener("click", () => {
    adminLoggedIn = false;
    closeAdmin();
    alert("Logged out.");
  });

  function createCard(item) {
    const article = document.createElement("article");
    article.className = "media-card";

    if (item.type === "videos") {
      const video = document.createElement("video");
      video.src = item.url;
      video.controls = true;
      video.preload = "metadata";
      article.appendChild(video);
    } else if (item.type === "photos") {
      const image = document.createElement("img");
      image.src = item.url;
      image.alt = item.title;
      image.loading = "lazy";
      article.appendChild(image);
    } else {
      const audio = document.createElement("audio");
      audio.src = item.url;
      audio.controls = true;
      audio.preload = "metadata";
      article.appendChild(audio);
    }

    const heading = document.createElement("h3");
    heading.textContent = item.title;
    article.appendChild(heading);

    if (item.artist) {
      const artist = document.createElement("p");
      artist.textContent = item.artist;
      article.appendChild(artist);
    }

    const download = document.createElement("a");
    download.href = item.url;
    download.download = item.title;
    download.textContent = "Download";
    download.className = "download-btn";
    article.appendChild(download);

    return article;
  }

  function renderMedia() {
    Object.values(mediaGrids).forEach((grid) => {
      if (grid) grid.replaceChildren();
    });

    const query = (searchInput?.value || "").toLowerCase().trim();
    let visibleCount = 0;

    mediaItems
      .filter((item) => {
        return (
          item.title.toLowerCase().includes(query) ||
          item.artist.toLowerCase().includes(query)
        );
      })
      .forEach((item) => {
        const grid = mediaGrids[item.type];
        if (grid) {
          grid.appendChild(createCard(item));
          visibleCount++;
        }
      });

    const emptyState = $("#emptyState");
    if (emptyState) {
      emptyState.classList.toggle("hidden", visibleCount > 0);
    }
  }

  searchInput?.addEventListener("input", renderMedia);

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  uploadForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!adminLoggedIn) {
      alert("Please log in first.");
      openLogin();
      return;
    }

    const type = $("#mediaType")?.value || "songs";
    const title = ($("#mediaTitle")?.value || "").trim();
    const artist = ($("#artist")?.value || "").trim();
    const file = $("#mediaFile")?.files?.[0];

    if (!title || !file) {
      message("Please enter a title and select a file.");
      return;
    }

    const allowedTypes = {
      songs: ["audio/"],
      videos: ["video/"],
      photos: ["image/"]
    };

    if (!allowedTypes[type]) {
      message("Please select a valid media type.");
      return;
    }

    if (!allowedTypes[type].some((prefix) =>
      file.type.startsWith(prefix)
    )) {
      message("The selected file does not match the media type.");
      return;
    }

    const url = URL.createObjectURL(file);
    objectUrls.push(url);

    mediaItems.unshift({
      type,
      title,
      artist,
      url
    });

    renderMedia();
    uploadForm.reset();
    message("Media added in this browser session.");
  });

  renderMedia();
})();
