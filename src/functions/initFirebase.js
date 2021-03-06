import firebase from "firebase/app";

import "firebase/analytics";

import "firebase/auth";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCaIaFMWGtMu9Vkyos9tMOPaphJRK9RwEI",
  authDomain: "fir-playground-ca007.firebaseapp.com",
  databaseURL: "https://fir-playground-ca007.firebaseio.com",
  projectId: "fir-playground-ca007",
  storageBucket: "fir-playground-ca007.appspot.com",
  messagingSenderId: "334102681190",
  appId: "1:334102681190:web:4ee68970fdf8e47396ffa7",
  measurementId: "G-2MLE6VM1YV",
};

const firebaseInitialized = firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

export default firebaseInitialized;
