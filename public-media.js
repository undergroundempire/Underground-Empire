// Add containers with these IDs to the matching sections of your existing index.html:
// <div id="public-photos" class="media-grid"></div>
// <div id="public-audio" class="media-grid"></div>
// <div id="public-videos" class="media-grid"></div>
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getFirestore, collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";
const app = initializeApp(firebaseConfig, "public-media");
const db = getFirestore(app);
const containers = { photo: "public-photos", audio: "public-audio", video: "public-videos" };

function cardFor(item) {
  const card = document.createElement("article"); card.className = "ue-media-card";
  const title = document.createElement("h3"); title.textContent = item.title; card.append(title);
  let media;
  if (item.kind === "photo") { media = document.createElement("img"); media.src = item.url; media.alt = item.title; media.loading = "lazy"; }
  if (item.kind === "audio") { media = document.createElement("audio"); media.controls = true; media.preload = "none"; media.src = item.url; }
  if (item.kind === "video") { media = document.createElement("video"); media.controls = true; media.preload = "metadata"; media.playsInline = true; media.src = item.url; }
  if (media) { media.className = "ue-media-file"; card.append(media); }
  return card;
}
async function render() {
  try {
    const snap = await getDocs(query(collection(db, "media"), where("status", "==", "published")));
    const items = snap.docs.map(d => d.data());
    for (const [kind, id] of Object.entries(containers)) {
      const root = document.getElementById(id); if (!root) continue;
      root.replaceChildren();
      const subset = items.filter(x => x.kind === kind).sort((a,b) => (b.publishedAt?.seconds || 0) - (a.publishedAt?.seconds || 0));
      if (!subset.length) { root.textContent = "New content coming soon."; continue; }
      subset.forEach(item => root.append(cardFor(item)));
    }
  } catch (e) { console.error("Public media failed to load", e); }
}
render();
