import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyBlL8gynu5kWaFZOHyhCkGUYgmGlxkMOxc",
    authDomain: "signal-clone-35013.firebaseapp.com",
    projectId: "signal-clone-35013",
    storageBucket: "signal-clone-35013.appspot.com",
    messagingSenderId: "395704560750",
    appId: "1:395704560750:web:16fe99daae09fa7bce8a7f",
    measurementId: "G-K4XH7V3TC6"
};

// let app;

// if (firebase.apps.length === 0) {
//     app = firebase.initializeApp(firebaseConfig);
// } else {
//     app = firebase.app();
// }


const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();

const auth = firebase.auth();

export { db, auth };