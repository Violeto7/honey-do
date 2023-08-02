//THIS FILE CONTAINS INFO FOR GOOGLE FIREBASE COMMUNICATION. 

import firebase from "firebase/compat";
import 'firebase/compat/firestore';
import 'firebase/compat/functions';
import { getAuth, initializeAuth } from "firebase/auth";
import {getFirestore, collection, getDocs} from 'firebase/firestore';

//Imports stuff for persistence
import AsyncStorage from "@react-native-async-storage/async-storage"; //npm i firebase@9.6.11
import { getReactNativePersistence} from 'firebase/auth/react-native';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAZVR762_gGKpS23jDn_lFcqJQmDE0jJ7U",
    authDomain: "honey-do-93116.firebaseapp.com",
    projectId: "honey-do-93116",
    storageBucket: "honey-do-93116.appspot.com",
    messagingSenderId: "844422702380",
    appId: "1:844422702380:web:17abbd24ef78a9755c3889"
};

let auth;

//If not initialized, initialize.
let app;
if(firebase.apps.length===0){
    app = firebase.initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage)
    });
  }else{
    app = firebase.app();
    auth = firebase.getAuth();
}

//Returns auth object to use throughout app.
// auth = getAuth();
export {auth};
 

//Sets up database
const db = getFirestore(app);
export {db};

