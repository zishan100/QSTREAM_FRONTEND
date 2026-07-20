// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import config from '../Utils/configHelper'

const firebaseConfig = {
  apiKey: config.APP_FIREBASE_API_KEY,
  authDomain: config.APP_AUTH_DOMAIN,
  projectId: config.APP_PROJECTID,
  storageBucket: config.APP_STORAGE_BUCKET,
  messagingSenderId: config.APP_MESSAGING_SENDER_ID,
  appId: config.APP_APPID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };