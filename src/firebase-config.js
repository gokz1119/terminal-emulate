// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA21c8XtHY_pV2YubSWYgZJTzsE1n0u8Cw",
  authDomain: "trialproject2-daee0.firebaseapp.com",
  projectId: "trialproject2-daee0",
  storageBucket: "trialproject2-daee0.appspot.com",
  messagingSenderId: "703861319691",
  appId: "1:703861319691:web:4f8bdc95ddc8fcb15e7f0e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);
