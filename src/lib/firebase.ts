import { deleteApp, getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyD07xM-Etr8Fz5hLnv_f-y2AbP1r26oREo",
    authDomain: "search-bar-eeaee.firebaseapp.com",
    projectId: "search-bar-eeaee",
    storageBucket: "search-bar-eeaee.appspot.com",
    messagingSenderId: "773262415210",
    appId: "1:773262415210:web:e169b970db7242ef8dc113",
    measurementId: "G-77WZ7GE1YT"
};

let firebaseApp;
if (!getApps().length) {
    firebaseApp = initializeApp(firebaseConfig);
}
else {
    firebaseApp = getApp();
    deleteApp(firebaseApp);
    firebaseApp = initializeApp(firebaseConfig);
}

export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);