// Import the functions you need from the SDKs you need
import { getApps, initializeApp, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9R1e3HJapezx3Uu2zlCxznUbvcJhgocY",
  authDomain: "init-firebase-adsport.firebaseapp.com",
  projectId: "init-firebase-adsport",
  storageBucket: "init-firebase-adsport.appspot.com",
  messagingSenderId: "932920746900",
  appId: "1:932920746900:web:aee6933880e85b4358e581",
  measurementId: "G-FH6GEVDNN8"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };
