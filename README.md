# Underground Empire — Bohee Vexer & Flexer

A responsive media website with admin login and upload support for photos, MP3/audio, and video.

## Run on your computer
1. Install Node.js 18 or newer.
2. Copy `.env.example` to `.env`.
3. Set a strong `ADMIN_PASSWORD` and a long random `SESSION_SECRET` in `.env`.
4. In this folder run `npm install`, then `npm start`.
5. Open `http://localhost:3000`.

Default username shown in the example: `BoheeAdmin`. Change the password before using the site.

## Host online (Render)
1. Create a GitHub account and upload this project folder to a **private or public repository**.
2. Sign in to Render and choose **New + → Web Service**, then connect the repository.
3. Build command: `npm install`; start command: `npm start`.
4. Add environment variables: `ADMIN_USER`, `ADMIN_PASSWORD`, and `SESSION_SECRET` (use strong unique values).
5. Deploy and open the Render URL.

## Important hosting note
This starter stores uploads in the app's local `uploads/` folder. Many hosted services use temporary filesystems, so uploaded media may disappear after redeploy/restart unless persistent disk storage is configured. For a reliable public site, attach a persistent disk mounted at `/opt/render/project/src/uploads` (and set `UPLOAD_DIR` support in the server if you change the path) or use object storage such as S3/Cloudinary. Hosting and persistent storage may cost money. This project package does not itself publish a live URL.

## Upload from the website
1. Open your hosted website.
2. Tap **Admin Login**.
3. Sign in with your admin username and password.
4. Choose **Upload Media** and select photos, MP3s, or videos.
5. Tap **Upload Selected Files**. The public site displays them in the matching section.

Supported types: JPG, PNG, WEBP, GIF, MP3, WAV, OGG, MP4, WEBM, MOV. Maximum 100 MB per file, up to 10 files per upload.
