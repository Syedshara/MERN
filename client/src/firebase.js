// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  
  apiKey: import.meta.env.VITE_FB_KEY,
  authDomain: "mern-921a6.firebaseapp.com",
  projectId: "mern-921a6",
  storageBucket: "mern-921a6.appspot.com",
  messagingSenderId: "670795215039",
  appId: "1:670795215039:web:64524579d976dc10dc960a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);