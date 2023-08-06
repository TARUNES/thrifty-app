// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// import firebase from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkIGV32T_pjj6r5PYk2a8xUTLMN-w16m8",
  authDomain: "thrifty-79de0.firebaseapp.com",
  projectId: "thrifty-79de0",
  storageBucket: "thrifty-79de0.appspot.com",
  messagingSenderId: "504440492665",
  appId: "1:504440492665:web:e1a5792a3f1aeaf6933aa8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
