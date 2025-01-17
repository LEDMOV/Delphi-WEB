// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1TrdkyhUIw57VCTOFI-JAD-sutyZM74s",
  authDomain: "delphi-a258b.firebaseapp.com",
  projectId: "delphi-a258b",
  storageBucket: "delphi-a258b.firebasestorage.app",
  messagingSenderId: "436957554052",
  appId: "1:436957554052:web:64bc06a472a36d8cf169d1",
  measurementId: "G-S1VBB3KTY0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);    
