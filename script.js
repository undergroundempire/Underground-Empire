// Update these URLs to your official pages.
const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/",
  youtube: "https://www.youtube.com/",
  instagram: "https://www.instagram.com/",
  spotify: "https://open.spotify.com/"
};

document.getElementById("year").textContent = new Date().getFullYear();

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    menuToggle.textContent = isOpen ? "×" : "☰";
  });
  mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    menuToggle.textContent = "☰";
  }));
}

// Browser-only preview. Files are not sent to a server or made public.
const collections = {
  music: { list: "musicList", search: "musicSearch", count: "musicCount", noun: "tracks" },
  videos: { list: "videoList", search: "videoSearch", count: "videoCount", noun: "videos" },
  shorts: { list: "shortsList", search: "shortsSearch", count: "shortsCount", noun: "clips" },
  pictures: { list: "pictureList", search: "pictureSearch", count: "pictureCount", noun: "photos" }
};
const mediaItems = { music: [], videos: [], shorts: [], pictures: [] };

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
function renderCollection(type) {
  const config = collections[type];
  const host = document.getElementById(config.list);
  const query = document.getElementById(config.search).value.trim().toLowerCase();
  const visible = mediaItems[type].filter(item => item.name.toLowerCase().includes(query));
  host.replaceChildren();
  document.getElementById(config.count).textContent = `${visible.length} ${config.noun}`;
  if (!visible.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = query ? "No matching files found." : "No files added to this preview yet.";
    host.appendChild(empty);
    return;
  }
  visible.forEach(item => {
    const card = document.createElement("article");
    card.className = "media-card";
    let player;
    if (type === "pictures") {
      player = document.createElement("img");
      player.src = item.url;
      player.alt = item.name;
      player.loading = "lazy";
    } else if (type === "videos" || type === "shorts") {
      player = document.createElement("video");
      player.src = item.url;
      player.controls = true;
      player.preload = "metadata";
      player.playsInline = true;
    } else {
      player = document.createElement("audio");
      player.src = item.url;
      player.controls = true;
      player.preload = "metadata";
    }
    const title = document.createElement("h3");
    title.textContent = item.name;
    const meta = document.createElement("p");
    meta.textContent = formatBytes(item.size);
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "remove-btn";
    remove.textContent = "Remove from preview";
    remove.style.cssText = "margin-top:12px;padding:8px 10px;background:#211013;color:#ff7b87;border:1px solid #5b2028;cursor:pointer;font-size:11px";
    remove.addEventListener("click", () => {
      URL.revokeObjectURL(item.url);
      mediaItems[type] = mediaItems[type].filter(entry => entry.id !== item.id);
      renderCollection(type);
    });
    card.append(player, title, meta, remove);
    host.appendChild(card);
  });
}
Object.keys(collections).forEach(type => {
  document.getElementById(collections[type].search).addEventListener("input", () => renderCollection(type));
});

document.getElementById("previewUpload").addEventListener("click", () => {
  const type = document.getElementById("mediaType").value;
  const files = Array.from(document.getElementById("mediaFiles").files || []);
  const message = document.getElementById("uploadMessage");
  if (!files.length) {
    message.textContent = "Pehle apne phone ya computer se file select karein.";
    return;
  }
  const accepted = files.filter(file => {
    if (type === "music") return file.type.startsWith("audio/");
    if (type === "pictures") return file.type.startsWith("image/");
    return file.type.startsWith("video/");
  });
  if (!accepted.length) {
    message.textContent = "Selected section ke liye sahi file type choose karein.";
    return;
  }
  accepted.forEach(file => mediaItems[type].push({
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    name: file.name,
    size: file.size,
    url: URL.createObjectURL(file)
  }));
  renderCollection(type);
  message.textContent = `${accepted.length} file(s) preview mein add ho gayi. Yeh abhi sirf is browser tab mein hain; live website par publish nahi hui.`;
});
