# UNDERGROUND EMPIRE — Website Setup (Hinglish)

## 1) Website files
- `index.html` — homepage, song/video/photo sections, admin login, upload panel
- `style.css` — black/red responsive professional design
- `app.js` — search, download, login and upload logic
- `supabase-setup.sql` — cloud database table and policy starter

## 2) Demo login (preview only)
- Username: `admin`
- Password: `Empire@2026`

Demo mode mein uploads sirf usi browser/device mein save rehte hain. GitHub par deploy karne ke baad bhi demo uploads sab visitors ko share nahi honge. Real public website ke liye neeche Supabase connect karna zaroori hai.

## 3) Permanent uploads ke liye Supabase connect karein
1. `https://supabase.com` par account/project banayein.
2. Project ke **SQL Editor** mein `supabase-setup.sql` ka code run karein.
3. **Storage** mein `media` naam ka bucket banayein aur **Public bucket** enable karein.
4. Storage policies banayein: public `SELECT`, authenticated `INSERT`, authenticated `DELETE` for bucket `media`.
5. Supabase **Project Settings → API** se Project URL aur anon/public key copy karein.
6. `app.js` ke top par:
   - `SUPABASE_URL = ""` mein Project URL paste karein.
   - `SUPABASE_ANON_KEY = ""` mein anon/public key paste karein.
7. Supabase **Authentication → Users** mein admin user create karein (email + strong password). Wahi email/password login page par use hoga.
8. Supabase Auth settings mein email confirmation ko apni zaroorat ke mutabiq configure karein.

**Security note:** Demo password public source code mein hai, isliye demo login ko real admin security na samjhein. Supabase mode configure karne ke baad real authentication use karein. Supabase `service_role` key kabhi website code mein na daalein.

## 4) GitHub Pages par free publish karna
1. GitHub par login karke **New repository** banayein, e.g. `underground-empire`.
2. Is folder ke files repository ke root mein upload karein: `index.html`, `style.css`, `app.js`, `supabase-setup.sql`, `README-HINGLISH.md`.
3. Repository mein **Settings → Pages** kholein.
4. **Deploy from a branch** choose karein, branch `main`, folder `/ (root)`, phir **Save**.
5. Kuch minutes baad GitHub Pages aapko website link dega, usually `https://YOUR-USERNAME.github.io/underground-empire/`.

## 5) Notes
- MP3, MP4, JPG, PNG, WEBP supported. Supabase mode mein file size limits aapke Supabase plan/storage settings par depend karti hain.
- Apne ya properly licensed songs/videos/photos hi upload karein.
- Social links aur real cover artwork ko aap baad mein apne official links/assets se replace kar sakte hain.
- GitHub Pages static hosting hai; website files host karta hai, uploaded media ka backend nahi.

## 6) Is updated design mein
- Reference screenshot ke dark black/red theme ke saath local hero artwork included hai (`assets/hero-banner.jpg`).
- `index.html` ko repository ke root mein hi rakhein; `assets` folder ko bhi upload karein, warna banner image nahi dikhegi.
- GitHub Pages ke liye repository Settings → Pages → Deploy from a branch → `main` → `/(root)` → Save.
