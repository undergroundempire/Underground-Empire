# Underground Empire Admin Panel — Android setup

This kit adds an admin panel and media uploader to your existing GitHub Pages website. It does not replace your current `index.html`, `style.css`, `script.js`, `bohee.jpg` or `Crown.png`.

## Before you start
- You need access to your GitHub repository.
- Create a Firebase project at https://console.firebase.google.com/
- Firebase Storage availability, quotas, and billing requirements can vary by project/region. Check the console before uploading large videos.
- Do not share your password or admin UID publicly.

## 1. Create Firebase project
1. Open Firebase Console and create a project, e.g. `underground-empire-media`.
2. In Project settings, add a **Web app** and copy its Firebase configuration.
3. Open **Authentication → Get started → Sign-in method** and enable **Email/Password**.
4. Open **Authentication → Users → Add user**. Create your own admin email/password. Do not create a public sign-up form.
5. Copy that user's exact **UID** from the Users list.
6. Open **Firestore Database → Create database**.
7. Open **Storage → Get started**. If Firebase asks for a billing plan or region decision, review it carefully before continuing.

## 2. Fill in the config and UID
1. In `firebase-config.js`, replace each `PASTE_...` config placeholder with the values from Firebase Project settings → Your apps.
2. Replace `PASTE_ADMIN_UID` in `firebase-config.js` with the admin user's UID.
3. Open `firestore.rules` and replace its `PASTE_ADMIN_UID` with the same UID.
4. Open `storage.rules` and replace its `PASTE_ADMIN_UID` with the same UID.
5. In Firebase Console, publish the contents of `firestore.rules` under Firestore → Rules.
6. Publish the contents of `storage.rules` under Storage → Rules.

Important: never deploy the rules with `PASTE_ADMIN_UID` still in them. Only your chosen UID is authorized.

## 3. Upload files to GitHub from Android
1. Unzip this kit on your phone.
2. Open your existing repository: https://github.com/undergroundempire/Underground-Empire
3. Upload these new files into the same folder where `index.html` is located:
   - `admin.html`
   - `admin.css`
   - `admin.js`
   - `firebase-config.js`
   - `public-media.js`
   - `public-media.css`
4. Do not delete your existing site files or your `bohee.jpg` / `Crown.png`.
5. In GitHub, open `admin.html` after deployment at:
   `https://undergroundempire.github.io/Underground-Empire/admin.html`
   (It may take a few minutes for GitHub Pages to update.)

## 4. Add media sections to the existing website
In your current `index.html`, inside the relevant sections, add one container for each category:

Photos/Gallery:
`<div id="public-photos" class="media-grid"></div>`

MP3 Songs:
`<div id="public-audio" class="media-grid"></div>`

Official Videos / Shorts:
`<div id="public-videos" class="media-grid"></div>`

Near the end of `index.html`, before `</body>`, add:
`<link rel="stylesheet" href="public-media.css">`
`<script type="module" src="public-media.js"></script>`

Place each container inside its matching section. Do not add the same ID twice. Keep your existing banner and crown code unchanged.

## 5. How to use it
1. Open `/admin.html`.
2. Sign in using the Firebase admin account.
3. Select Photo, MP3 Song or Video, enter a title and choose a file.
4. Review the preview and press **UPLOAD AS DRAFT**.
5. Check the new draft in the dashboard.
6. Press **Publish** to show it on the public website.

## Notes and troubleshooting
- Firebase Storage stores the uploaded bytes; Firestore stores titles, URLs and publish status.
- Only the configured admin UID can use the dashboard and write media records. Public visitors can read published records only.
- Download URLs are bearer links. Anyone who obtains a published media URL can access that file, so upload only content intended to be public.
- The browser upload form currently limits a file to 100 MB. This is a UI limit, not a promise that your Firebase plan supports that file size.
- If login fails, check Firebase config, Authentication Email/Password, authorized domain settings, and UID.
- If upload fails, check Storage setup, billing/quotas and Storage Rules.
- If Publish fails, check Firestore Rules and make sure the UID matches in every location.
- This kit does not auto-post to Facebook, Instagram or YouTube.
