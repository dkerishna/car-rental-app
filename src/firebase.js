// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCsvCxup-WS-EzQfVbO9M3pWUlF_Rv6aaE",
    authDomain: "image-list-21488.firebaseapp.com",
    projectId: "image-list-21488",
    storageBucket: "image-list-21488.firebasestorage.app",
    messagingSenderId: "782632923157",
    appId: "1:782632923157:web:ff422ca96347f64f999e1c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);