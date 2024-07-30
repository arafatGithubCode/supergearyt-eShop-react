import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAbJ6rlNc2w4QELJeKPG5oxGjPYscrwBUg",
  authDomain: "supergearyt-eshop-react.firebaseapp.com",
  projectId: "supergearyt-eshop-react",
  storageBucket: "supergearyt-eshop-react.appspot.com",
  messagingSenderId: "66651033140",
  appId: "1:66651033140:web:33dfe0fbc0e23d884ac461",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
