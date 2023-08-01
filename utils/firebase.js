// Import the functions you need from the SDKs you need
import { getApps, initializeApp, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXfWCPp_35qSZ-N6QxZzBAAtStzcqGkkk",
  authDomain: "sport-finder-ebef8.firebaseapp.com",
  projectId: "sport-finder-ebef8",
  storageBucket: "sport-finder-ebef8.appspot.com",
  messagingSenderId: "680489585935",
  appId: "1:680489585935:web:f10d1a6a2852e7eeba827a",
  measurementId: "G-D04ZGSM45H"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };
