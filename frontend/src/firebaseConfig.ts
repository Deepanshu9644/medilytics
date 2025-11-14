import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDmIyKFGhGyH_8n509vlQtpdH8JbB94kkA",
  authDomain: "medilytics-3bb94.firebaseapp.com",
  projectId: "medilytics-3bb94",
  storageBucket: "medilytics-3bb94.firebasestorage.app",
  messagingSenderId: "609533288973",
  appId: "1:609533288973:web:abb0950758d8e6ae2eab44",
  measurementId: "G-5J38WY7GTL"
};




const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
