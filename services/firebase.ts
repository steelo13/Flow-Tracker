import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// ------------------------------------------------------------------
// TODO: PASTE YOUR FIREBASE CONFIGURATION BELOW
// 1. Go to console.firebase.google.com
// 2. Create a project -> Add web app -> Copy config
// ------------------------------------------------------------------
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// Initialize Firebase
let app;
let dbInstance;

// Only initialize if the config has been updated from the default placeholders
const isConfigured = firebaseConfig.apiKey !== "YOUR_API_KEY_HERE";

if (isConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    dbInstance = getFirestore(app);
    console.log("Firebase initialized successfully");
  } catch (error) {
    console.error("Firebase initialization error:", error);
  }
} else {
  console.warn("Firebase config is missing. App is running in local/demo mode.");
}

export const db = dbInstance;