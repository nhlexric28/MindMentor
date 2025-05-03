// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCtwbiTLCKIWrJQxs8529BYTHc-CtHrOBg',
  authDomain: 'mindmentor-e9e15.firebaseapp.com',
  projectId: 'mindmentor-e9e15',
  storageBucket: 'mindmentor-e9e15.firebasestorage.app',
  messagingSenderId: '419452300257',
  appId: '1:419452300257:web:5432157300528bf65dc0a0',
  measurementId: 'G-XMNJFSZS5L' // Optional, if you are using analytics
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
