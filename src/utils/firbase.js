// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRDuzvvDD8IMFIculMyJ5DkAfr_fynd_4",
  authDomain: "netflixgpt-bb3a2.firebaseapp.com",
  projectId: "netflixgpt-bb3a2",
  storageBucket: "netflixgpt-bb3a2.firebasestorage.app",
  messagingSenderId: "809483568355",
  appId: "1:809483568355:web:4c82f2839715d07860f1d6",
  measurementId: "G-TV1VB4GHDH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth()