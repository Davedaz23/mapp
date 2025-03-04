import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging"; // Import Cloud Messaging

// Firebase config for the app 'com.medicalappointmentapp'
const firebaseConfig = {
  apiKey: "AIzaSyBWLOfCyXXVzr50FaCI8uPFx0EStcc5L-8",
  authDomain: "trip-e9894.firebaseapp.com",
  projectId: "trip-e9894",
  storageBucket: "trip-e9894.appspot.com",
  messagingSenderId: "145378113873",
  appId: "1:145378113873:android:9833ac125ce5930b147b70", // Use this appId for 'com.medicalappointmentapp'
  databaseURL: "https://trip-e9894-default-rtdb.firebaseio.com",
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const firestore = getFirestore(app);
const messagingInstance = getMessaging(app); // Initialize Cloud Messaging

export { app, auth, firestore, messagingInstance }; // Export messagingInstance
