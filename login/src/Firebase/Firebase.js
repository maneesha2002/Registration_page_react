import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId:"", 
};

// Initialize Firebases
const app = initializeApp(firebaseConfig);

export const database=getAuth(app);

export const imgDB=getStorage(app);

export const txtDB=getFirestore(app);