import { getAuth } from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyARz0-P1nAvxAOP14ML3A8DtZw37TQycWI",
    authDomain: "maltimart1-9f41d.firebaseapp.com",
    projectId: "maltimart1-9f41d",
    storageBucket: "maltimart1-9f41d.appspot.com",
    messagingSenderId: "455947129560",
    appId: "1:455947129560:web:dafb22bebfaca1cb5b3dad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase
export const auth = getAuth(app);
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app;