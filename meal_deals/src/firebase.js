// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";

//import {firebase } from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLILuBYYSb2ZvvWSG2o4JD2W389V4OYU0",
  authDomain: "captsonev2.firebaseapp.com",
  projectId: "captsonev2",
  storageBucket: "captsonev2.appspot.com",
  messagingSenderId: "272842438997",
  appId: "1:272842438997:web:82eb144f7d1c3bbd5ad7dc",
  measurementId: "G-K7FC7GB9W1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
// Initialize Firebase Authentication and get a reference to the service

const provider = new GoogleAuthProvider();
export default app;