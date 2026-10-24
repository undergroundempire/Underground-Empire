# Underground Empire — GitHub website

A responsive, dark black/red music website based on the reference design. Includes Home, MP3 Songs, Videos, Photos, search, mobile navigation, sample media cards, and a demo admin dashboard.

## Publish it on GitHub Pages (Android or computer)

1. Download and extract `underground-empire-github.zip`.
2. Open GitHub and create a new repository. Example: `underground-empire`.
3. Upload the **contents** of this folder (especially `index.html`, `style.css`, `script.js`, and the `assets` folder) to the repository root. Do not upload only the ZIP file.
4. In the repository, open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select branch `main` and folder `/ (root)`, then press **Save**.
7. Wait for GitHub Pages to publish. Open the URL shown in the Pages section.

## Demo admin login

Press **Admin Login** on the website:
- Username: `admin`
- Password: `empire123`

**Important:** This is a front-end demo login, not secure authentication. Anyone can inspect static website JavaScript and see these credentials. Do not use this as a real protected admin system.

## Uploads: what works and what does not

The dashboard lets you select local audio/video/photo files and preview them in your current browser session. Browser object URLs are temporary; selected files are **not** sent to GitHub, are not saved permanently, and are not visible to other visitors. GitHub Pages only hosts static files and cannot accept uploads on its own.

For permanent public uploads and real admin security, connect a backend (for example, a server/API with authentication and cloud file storage). Never put private API keys or passwords in `script.js`.

## Add your own media

- Put your own image at `assets/hero.jpg` to use it as the hero background. If that file is absent, the hero still shows the designed dark background.
- For media cards, edit the sample arrays near the top of `script.js`. Use your own public image paths in the `url` field and keep those image files in the repository.
- You can change artist/title text in `index.html`.

## Files

- `index.html` — page structure and sections
- `style.css` — responsive styling
- `script.js` — sample content, search, demo login and local preview controls
- `assets/` — add your images here
