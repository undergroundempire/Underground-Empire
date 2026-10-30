import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-storage.js";
import { firebaseConfig, ADMIN_UID } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app), db = getFirestore(app), storage = getStorage(app);
const $ = id => document.getElementById(id);
const loginPanel = $("loginPanel"), dashboard = $("dashboard");
let previewUrl = null;

function message(id, text) { $(id).textContent = text; }
function showPreview(file) {
  const area = $("preview");
  if (previewUrl) URL.revokeObjectURL(previewUrl);
  previewUrl = null;
  area.replaceChildren();
  if (!file) { area.textContent = "File preview appears here"; return; }
  previewUrl = URL.createObjectURL(file);
  let el;
  if (file.type.startsWith("image/")) { el = document.createElement("img"); el.src = previewUrl; }
  else if (file.type.startsWith("audio/")) { el = document.createElement("audio"); el.controls = true; el.src = previewUrl; }
  else if (file.type.startsWith("video/")) { el = document.createElement("video"); el.controls = true; el.src = previewUrl; }
  else { area.textContent = "Unsupported file type"; return; }
  area.append(el);
}
$("kind").addEventListener("change", () => {
  const k = $("kind").value, fileInput = $("file");
  fileInput.value = "";
  fileInput.accept = k === "photo" ? "image/*" : k === "audio" ? "audio/*" : "video/*";
  showPreview(null);
});
$("file").addEventListener("change", e => showPreview(e.target.files[0]));
$("loginForm").addEventListener("submit", async e => {
  e.preventDefault(); message("loginMessage", "Signing in…");
  try { await signInWithEmailAndPassword(auth, $("email").value.trim(), $("password").value); message("loginMessage", ""); }
  catch (err) { message("loginMessage", "Login failed. Check your email/password and Firebase setup."); }
});
$("logoutBtn").addEventListener("click", () => signOut(auth));
$("refreshBtn").addEventListener("click", loadMedia);

onAuthStateChanged(auth, user => {
  if (user && user.uid === ADMIN_UID && ADMIN_UID !== "PASTE_ADMIN_UID") {
    loginPanel.classList.add("hidden"); dashboard.classList.remove("hidden");
    $("signedInAs").textContent = "Signed in as " + user.email;
    loadMedia();
  } else {
    dashboard.classList.add("hidden"); loginPanel.classList.remove("hidden");
    if (user) { signOut(auth); message("loginMessage", "This account is not the configured admin."); }
  }
});

$("uploadForm").addEventListener("submit", async e => {
  e.preventDefault();
  const user = auth.currentUser, file = $("file").files[0], title = $("title").value.trim(), kind = $("kind").value;
  if (!user || user.uid !== ADMIN_UID) return message("uploadMessage", "Admin login required.");
  if (!file || !title) return message("uploadMessage", "Enter a title and choose a file.");
  const allowed = kind === "photo" ? file.type.startsWith("image/") : kind === "audio" ? file.type.startsWith("audio/") : file.type.startsWith("video/");
  if (!allowed) return message("uploadMessage", "File type does not match the selected category.");
  if (file.size > 100 * 1024 * 1024) return message("uploadMessage", "File is over 100 MB. Choose a smaller file.");
  const btn = e.submitter; btn.disabled = true; message("uploadMessage", "Uploading file… please keep this page open.");
  try {
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const path = `media/${user.uid}/${Date.now()}-${safeName}`;
    const fileRef = ref(storage, path);
    await uploadBytes(fileRef, file, { contentType: file.type });
    const url = await getDownloadURL(fileRef);
    await addDoc(collection(db, "media"), { title, kind, fileName: file.name, storagePath: path, url, status: "draft", createdAt: serverTimestamp(), createdBy: user.uid });
    message("uploadMessage", "Uploaded as a draft. Check it below, then press Publish.");
    $("uploadForm").reset(); $("file").accept = "image/*"; showPreview(null); await loadMedia();
  } catch (err) {
    console.error(err); message("uploadMessage", "Upload failed. Check Firebase config, Storage setup, Rules and billing.");
  } finally { btn.disabled = false; }
});

async function loadMedia() {
  const user = auth.currentUser;
  if (!user || user.uid !== ADMIN_UID) return;
  const list = $("mediaList"); list.textContent = "Loading…";
  try {
    const snap = await getDocs(collection(db, "media"));
    const items = snap.docs.map(d => ({ id: d.id, ...d.data() })).sort((a,b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
    list.replaceChildren();
    if (!items.length) { list.textContent = "No uploads yet."; return; }
    for (const item of items) {
      const card = document.createElement("article"); card.className = "item";
      const info = document.createElement("div"), title = document.createElement("h3"), meta = document.createElement("p"), status = document.createElement("p");
      title.textContent = item.title; meta.textContent = `${item.kind} · ${item.fileName || ""}`;
      status.className = "status"; status.textContent = item.status === "published" ? "PUBLISHED" : "DRAFT";
      info.append(title, meta, status);
      const actions = document.createElement("div");
      if (item.kind === "photo") { const img = document.createElement("img"); img.src = item.url; img.alt = item.title; img.style.cssText = "max-width:100%;max-height:180px;margin-top:10px"; info.append(img); }
      if (item.kind === "audio") { const a = document.createElement("audio"); a.controls = true; a.src = item.url; a.style.cssText = "width:100%;margin-top:10px"; info.append(a); }
      if (item.kind === "video") { const v = document.createElement("video"); v.controls = true; v.src = item.url; v.style.cssText = "max-width:100%;max-height:220px;margin-top:10px"; info.append(v); }
      const button = document.createElement("button"); button.className = item.status === "published" ? "secondary" : "primary";
      button.textContent = item.status === "published" ? "Already published" : "Publish";
      button.disabled = item.status === "published";
      button.addEventListener("click", async () => {
        button.disabled = true; button.textContent = "Publishing…";
        try { await updateDoc(doc(db, "media", item.id), { status: "published", publishedAt: serverTimestamp() }); await loadMedia(); }
        catch (err) { console.error(err); button.disabled = false; button.textContent = "Retry Publish"; alert("Publish failed. Check Firestore Rules."); }
      });
      actions.append(button); card.append(info, actions); list.append(card);
    }
  } catch (err) { console.error(err); list.textContent = "Could not load media. Check Firebase config and Firestore Rules."; }
}
