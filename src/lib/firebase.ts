
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration - replace with your own when connecting to Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDummyKeyForEstatePulseApp",
  authDomain: "estatepulse-demo.firebaseapp.com",
  projectId: "estatepulse-demo",
  storageBucket: "estatepulse-demo.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:1234567890abcdef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
