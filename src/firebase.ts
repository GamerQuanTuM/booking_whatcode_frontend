import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, FacebookAuthProvider, getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyBO0Eb3h8TRngfkk3PPqpYGo-gdw6hamqE",
    authDomain: "booking-app-10.firebaseapp.com",
    projectId: "booking-app-10",
    storageBucket: "booking-app-10.appspot.com",
    messagingSenderId: "453230873990",
    appId: "1:453230873990:web:828775f728feb129d3f007"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const GoogleProvider = new GoogleAuthProvider()
export const FacebookProvider = new FacebookAuthProvider()