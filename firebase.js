/*import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'; 

const firebaseConfig = {
    apiKey: "AIzaSyC5TZG8m3DvxkASiFpAbsm-ttR5dOkbico",
    authDomain: "signal-clone-c7206.firebaseapp.com",
    projectId: "signal-clone-c7206",
    storageBucket: "signal-clone-c7206.appspot.com",
    messagingSenderId: "726117023488",
    appId: "1:726117023488:web:845f2ab6d12626e68fbde5"
};

let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
*/

// refer to https://docs.expo.dev/guides/using-firebase/

import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
const { getDefaultConfig } = require('@expo/metro-config');

import firebase from "firebase/compat/app";
// Required for side-effects
import "firebase/firestore";
import { getFirestore } from 'firebase/firestore';
// import {...} from "firebase/database";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyC5TZG8m3DvxkASiFpAbsm-ttR5dOkbico',
  authDomain: 'signal-clone-c7206.firebaseapp.com',
  databaseURL: 'https://signal-clone-c7206.firebaseio.com',
  projectId: 'signal-clone-c7206',
  storageBucket: 'signal-clone-c7206.appspot.com',
  messagingSenderId: '726117023488',
  appId: '1:726117023488:web:845f2ab6d12626e68fbde5',
  //measurementId: 'G-measurement-id',
};

const app = initializeApp(firebaseConfig);

const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.sourceExts.push('cjs');

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


module.exports = defaultConfig;

export { db, auth };
