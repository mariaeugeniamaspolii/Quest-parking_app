// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA4U6v0yo_LUHeMwx1bhC2ZjEuxbHgJvaw",
    authDomain: "questparkingapprn.firebaseapp.com",
    projectId: "questparkingapprn",
    storageBucket: "questparkingapprn.appspot.com",
    messagingSenderId: "194052927380",
    appId: "1:194052927380:web:b0538fd84e6c8463ab6981",
    measurementId: "G-1G05VLP4VH"
};


if (!firebase.apps.length) {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
}

export {
    firebase
}