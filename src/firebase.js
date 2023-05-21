import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "primegears01.firebaseapp.com",
  projectId: "primegears01",
  storageBucket: "primegears01.appspot.com",
  messagingSenderId: "633308493193",
  appId: "1:633308493193:web:96eb444447aa68c2bedd58"
};

console.log(process.env.REACT_APP_FIREBASE_KEY)
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth();