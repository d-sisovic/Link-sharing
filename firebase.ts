import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCaX0SRtWa-ecU44jA8e-dalR9kcUN4pdM",
    authDomain: "link-sharing-183d2.firebaseapp.com",
    projectId: "link-sharing-183d2",
    storageBucket: "link-sharing-183d2.appspot.com",
    messagingSenderId: "286405717194",
    appId: "1:286405717194:web:b4d2955ffbec62d3329833"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage();

export default auth;