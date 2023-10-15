// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAoCvDqfMbO1NbSAY30sc_hHyolOrJ_iwo",
    authDomain: "electric-vehicle-dashboard.firebaseapp.com",
    projectId: "electric-vehicle-dashboard",
    storageBucket: "electric-vehicle-dashboard.appspot.com",
    messagingSenderId: "562911245658",
    appId: "1:562911245658:web:ddbe6189e23aee6f67ef63",
};

// Initialize Firebase
const App = initializeApp(firebaseConfig);
export const auth = getAuth(App);
export const db = getFirestore(App);
