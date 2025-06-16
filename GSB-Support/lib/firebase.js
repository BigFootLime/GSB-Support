// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
 import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCafqjszHBsJLFRhxPZbNoBbJQYc8aeiJ4",
  authDomain: "gsb-support-a5b46.firebaseapp.com",
  projectId: "gsb-support-a5b46",
  storageBucket: "gsb-support-a5b46.firebasestorage.app",
  messagingSenderId: "804834487280",
  appId: "1:804834487280:web:8fb95c3ecf08aae4240b35",
  measurementId: "G-5GN148N2DB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);