// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCryjThasHg79QvBz35u8w2DCJKR5KyXAc",
  authDomain: "docwrite-38576.firebaseapp.com",
  projectId: "docwrite-38576",
  storageBucket: "docwrite-38576.appspot.com",
  messagingSenderId: "1003252057970",
  appId: "1:1003252057970:web:79c3a99028d8e0c2fdffeb",
  measurementId: "G-V2322R142P",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
