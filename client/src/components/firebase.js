// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKhGLBWv1_GvUmRgAguzFIWGzzf8wQ4lg",
  authDomain: "trailblazer-fc871.firebaseapp.com",
  projectId: "trailblazer-fc871",
  storageBucket: "trailblazer-fc871.firebasestorage.app",
  messagingSenderId: "229152874013",
  appId: "1:229152874013:web:88fa0648df414fc07f30f4",
  measurementId: "G-ZFC56QYC5D"
};

// Initialize Firebase
const analytics = getAnalytics(app);
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
