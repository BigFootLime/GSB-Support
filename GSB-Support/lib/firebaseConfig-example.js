import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

// Configuration Firebase
const firebaseConfig = {
  apiKey: 'your-api-key-here',
  authDomain: 'your-auth-domain-here',
  projectId: 'your-project-id-here',
  storageBucket: 'your-storage-bucket-here',
  messagingSenderId: 'messaging-sender-id-here',
  appId: 'api-id-here',
  measurementId: 'measurement-id-here',
};

// Initialisation Firebase
const app = initializeApp(firebaseConfig);

// Auth avec persistance
import { getAuth } from 'firebase/auth';
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Firestore
export const db = getFirestore(app);
