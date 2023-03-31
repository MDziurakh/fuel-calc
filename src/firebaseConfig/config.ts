import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";

export const config = {
 firebaseConfig:{
    apiKey: process.env.REACT_APP_VITE_API_KEY,
    authDomain: process.env.REACT_APP_VITE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_VITE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_VITE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_VITE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_VITE_APP_ID,
 }
};


export const app = initializeApp(config.firebaseConfig);

export const db = getFirestore(app);