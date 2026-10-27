(() => {
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }));
  }
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  [["musicSearch","musicList"],["videoSearch","videoList"],["shortSearch","shortList"],["pictureSearch","pictureList"]].forEach(([sid,lid]) => {
    const input = document.getElementById(sid), list = document.getElementById(lid);
    if (!input || !list) return;
    input.addEventListener("input", () => {
      const q = input.value.toLowerCase().trim();
      list.querySelectorAll("[data-media-name]").forEach(card => {
        card.hidden = !card.dataset.mediaName.includes(q);
      });
    });
  });

  const fileInput = document.getElementById("mediaFiles");
  const typeSelect = document.getElementById("mediaType");
  const preview = document.getElementById("previewList");
  if (fileInput && typeSelect && preview) {
    fileInput.addEventListener("change", () => {
      const files = Array.from(fileInput.files || []);
      preview.replaceChildren();
      if (!files.length) {
        const p = document.createElement("p"); p.className = "empty-state"; p.textContent = "Selected files preview here."; preview.append(p); return;
      }
      files.forEach(file => {
        const card = document.createElement("article"); card.className = "media-card";
        const title = document.createElement("h3"); title.textContent = file.name; card.append(title);
        const url = URL.createObjectURL(file);
        let media;
        if (file.type.startsWith("audio/")) { media = document.createElement("audio"); media.controls = true; media.src = url; }
        else if (file.type.startsWith("video/")) { media = document.createElement("video"); media.controls = true; media.playsInline = true; media.src = url; }
        else if (file.type.startsWith("image/")) { media = document.createElement("img"); media.alt = file.name; media.src = url; }
        if (media) card.append(media);
        preview.append(card);
      });
      const targetId = ({music:"musicList",videos:"videoList",shorts:"shortList",pictures:"pictureList"})[typeSelect.value];
      const target = document.getElementById(targetId);
      if (target) {
        target.replaceChildren();
        files.forEach(file => {
          const card = document.createElement("article"); card.className = "media-card"; card.dataset.mediaName = file.name.toLowerCase();
          const title = document.createElement("h3"); title.textContent = file.name; card.append(title);
          const url = URL.createObjectURL(file); let media;
          if (file.type.startsWith("audio/")) { media = document.createElement("audio"); media.controls = true; media.src = url; }
          else if (file.type.startsWith("video/")) { media = document.createElement("video"); media.controls = true; media.playsInline = true; media.src = url; }
          else if (file.type.startsWith("image/")) { media = document.createElement("img"); media.alt = file.name; media.src = url; }
          if (media) card.append(media); target.append(card);
        });
      }
    });
  }
})();
