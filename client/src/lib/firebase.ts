import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAN-VfgGhdGv3SPsmzCcY8WcJLwGQdVHp4",
  authDomain: "supergearreacteshop.firebaseapp.com",
  projectId: "supergearreacteshop",
  storageBucket: "supergearreacteshop.appspot.com",
  messagingSenderId: "574283794804",
  appId: "1:574283794804:web:65d88d618eb23ded3ec421",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
