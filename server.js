require("dotenv").config();
const express = require("express");
const session = require("express-session");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const UPLOAD_DIR = path.join(__dirname, "uploads");
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || "dev-only-change-this-secret",
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 8 * 60 * 60 * 1000 }
}));
app.use("/uploads", express.static(UPLOAD_DIR));
app.use(express.static(path.join(__dirname, "public")));

const allowed = new Set(["image/jpeg","image/png","image/webp","image/gif","audio/mpeg","audio/mp3","audio/wav","audio/ogg","video/mp4","video/webm","video/quicktime"]);
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const safe = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-100);
    cb(null, Date.now() + "-" + safe);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => cb(null, allowed.has(file.mimetype))
});
const isAdmin = (req, res, next) => req.session && req.session.admin ? next() : res.status(401).json({ error: "Please sign in as admin first." });

app.post("/api/login", (req, res) => {
  const user = process.env.ADMIN_USER || "BoheeAdmin";
  const password = process.env.ADMIN_PASSWORD || "ChangeThisStrongPassword";
  if (req.body.username === user && req.body.password === password) {
    req.session.admin = true;
    return res.json({ ok: true });
  }
  res.status(401).json({ error: "Incorrect username or password." });
});
app.post("/api/logout", (req, res) => req.session.destroy(() => res.json({ ok: true })));
app.get("/api/session", (req, res) => res.json({ admin: !!(req.session && req.session.admin) }));
app.get("/api/media", (_req, res) => {
  const items = fs.readdirSync(UPLOAD_DIR).filter(n => !n.startsWith(".")).map(name => {
    const ext = path.extname(name).toLowerCase();
    const type = [".jpg",".jpeg",".png",".webp",".gif"].includes(ext) ? "photo" :
      [".mp3",".wav",".ogg"].includes(ext) ? "audio" : "video";
    return { name, type, url: "/uploads/" + encodeURIComponent(name) };
  }).sort((a,b) => b.name.localeCompare(a.name));
  res.json(items);
});
app.post("/api/upload", isAdmin, upload.array("media", 10), (req, res) => {
  if (!req.files || !req.files.length) return res.status(400).json({ error: "No supported files selected. Use JPG/PNG/WEBP/GIF, MP3/WAV/OGG, or MP4/WEBM/MOV." });
  res.json({ ok: true, count: req.files.length });
});
app.delete("/api/media/:name", isAdmin, (req, res) => {
  const name = path.basename(req.params.name);
  const target = path.join(UPLOAD_DIR, name);
  if (fs.existsSync(target)) fs.unlinkSync(target);
  res.json({ ok: true });
});
app.listen(PORT, () => console.log(`Underground Empire running on port ${PORT}`));
