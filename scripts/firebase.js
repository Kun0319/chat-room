// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider,getAuth ,onAuthStateChanged,signInWithPopup} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore,addDoc,collection} from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
console.log(firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

export function requireAuth(){
    return new Promise((resolve, reject) => {
        const auth = getAuth();
        const unsubscribe  = onAuthStateChanged(auth, (user) => {
        if(user){
            // 已經登入
            console.log('已經登入');
            resolve(user);
            unsubscribe();
            }else{
            // 未登入
            signInWithPopup(auth, provider);
        }
    })
    })
}

export async function createRoom(){
    const db = getFirestore();
    const room = await addDoc(collection(db, "room"), {
        name:"Chat room",
        createdAt: new Date(),
    })
    return room.id;
}