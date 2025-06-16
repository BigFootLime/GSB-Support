import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

// ✅ Configuration Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyCafqjszHBsJLFRhxPZbNoBbJQYc8aeiJ4',
  authDomain: 'gsb-support-a5b46.firebaseapp.com',
  projectId: 'gsb-support-a5b46',
  storageBucket: 'gsb-support-a5b46.appspot.com', // ← fix (tu avais .app au lieu de .app**spot**)
  messagingSenderId: '804834487280',
  appId: '1:804834487280:web:8fb95c3ecf08aae4240b35',
  measurementId: 'G-5GN148N2DB',
};

// ✅ Initialisation Firebase
const app = initializeApp(firebaseConfig);

// 🔐 Auth avec persistance
import { getAuth } from 'firebase/auth';
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// 🗄️ Firestore
export const db = getFirestore(app);
