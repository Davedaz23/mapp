import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBWLOfCyXXVzr50FaCI8uPFx0EStcc5L-8",
  authDomain: "trip-e9894.firebaseapp.com",
  projectId: "trip-e9894",
  storageBucket: "trip-e9894.appspot.com",
  messagingSenderId: "145378113873",
  appId: "1:145378113873:android:9833ac125ce5930b147b70",
  databaseURL: "https://trip-e9894-default-rtdb.firebaseio.com",
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Firebase Services
const auth = getAuth(app);
const firestore = getFirestore(app);

export { app, auth, firestore };
