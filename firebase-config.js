// Firebase web config is not a password. Security comes from Firebase Auth + Rules.
// Replace every placeholder with the values from Firebase Console > Project settings > Your apps.
export const firebaseConfig = {
  apiKey: "PASTE_API_KEY",
  authDomain: "PASTE_PROJECT_ID.firebaseapp.com",
  projectId: "PASTE_PROJECT_ID",
  storageBucket: "PASTE_STORAGE_BUCKET",
  messagingSenderId: "PASTE_MESSAGING_SENDER_ID",
  appId: "PASTE_APP_ID"
};

// Paste the UID of your own admin account from Firebase Authentication > Users.
// Do not use an email address here; use the exact UID.
export const ADMIN_UID = "PASTE_ADMIN_UID";
