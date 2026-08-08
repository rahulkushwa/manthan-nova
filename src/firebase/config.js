import { initializeApp, getApps, getApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyApEu6d7Bip3nxRKrTMviAFh5U9GOCXntc",
  authDomain: "manthan-nova.firebaseapp.com",
  projectId: "manthan-nova",
  storageBucket: "manthan-nova.firebasestorage.app",
  messagingSenderId: "950014462279",
  appId: "1:950014462279:web:632f2a76c54fefab5e6462",
};

// Main App
export const app =
  getApps().length > 0
    ? getApp()
    : initializeApp(firebaseConfig);

// Secondary App (Used only for creating student accounts)
export const secondaryApp =
  getApps().find((app) => app.name === "Secondary")
    ? getApp("Secondary")
    : initializeApp(firebaseConfig, "Secondary");

export default app;