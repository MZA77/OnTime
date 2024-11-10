// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Import Firebase Authentication
import { getFirestore } from 'firebase/firestore'; // Import Firestore Database


const firebaseConfig = {
    apiKey: "AIzaSyBfLB1OovDcMNQZcjqS-J-Vfywew-lFylE",              
    authDomain: "ontime-56305.firebaseapp.com",                     
    projectId: "ontime-56305",                                      
    storageBucket: "ontime-56305.appspot.com",                      
    messagingSenderId: "854093976816",
    appId: "1:854093976816:android:af247d959053a7316f5e35"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Firestore Database
const db = getFirestore(app);

// Export the auth object
export { auth, db };
