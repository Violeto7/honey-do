import {collection, addDoc, getDoc, doc, updateDoc, arrayRemove, arrayUnion, setDoc} from "firebase/firestore";
import { useState, useEffect } from 'react';
import { requestConverter } from "../firebase";
import {db, auth} from '../firebaseConfig';//Imports database
//class for storing the Request info displayed on the Request search and cookbook page

let RequestLDB = [];
function setRequestLDB(arr){
    RequestLDB = arr;
}

async function getRequestsDB() {
    if (auth.currentUser) {
        let snapshot;
        try {
            let RequestDB = doc(db, "Requests", auth.currentUser.uid); //Database entry for the user
            snapshot = await getDoc(RequestDB);
            
            if (snapshot.exists()) {
                setRequestLDB(Object.values(snapshot.data())[0]); //Sets ingredients array to input from database
            }
        } catch (e) {
            alert(e);
        }
    }
}

async function addRequestDB(req) {
    //Function to add item into /Pantry/UID Requests array
    try {
        //getRequestsDB();
        if (auth.currentUser) {

            //FOR ME: CHANGE TO USE REQUESTCONVERTER
            //setRequestLDB((oldIng) => [...oldIng, req]);
            const RequestDB = doc(db, "Users", auth.currentUser.uid); //Database entry for the user
            await updateDoc(RequestDB, {backlog: arrayUnion(req)});
        }
    }catch (e) {
        alert(e);
    }
}

export async function addRequestByID(userID, req) {
    //Function to add item into /Pantry/UID Requests array
    try {
        //getRequestsDB();
        if (auth.currentUser) {

            //FOR ME: CHANGE TO USE REQUESTCONVERTER
            //setRequestLDB((oldIng) => [...oldIng, req]);
            const RequestDB = doc(db, "Users", userID); //Database entry for the user
            await updateDoc(RequestDB, {backlog: arrayUnion(req)});
        }
    }catch (e) {
        alert(e);
    }
}

async function removeRequestDB(id) {
    //Function to remove from Requests array
    try {
        getRequestsDB();
        if (auth.currentUser) {
                const newID = RequestLDB.filter((nid) => nid != id);
                setRequestLDB(newID);
                let RequestDB = doc(db, "Requests", auth.currentUser.uid); //Database entry for the user
                await updateDoc(RequestDB, {
                RequestID: arrayRemove(id),
            });
        }
    } catch (e) {
        alert(e);
    }
}

let ingredientsMDB = [];
function setIngredientsDBMap(arr){
    ingredientsMDB = arr;
}

async function getPantryDB() {
  if (auth.currentUser) {
    let snapshot;
    try {
      let pantryDB = doc(db, "Pantry", auth.currentUser.uid); //Database entry for the user
      snapshot = await getDoc(pantryDB);
      if (snapshot.exists) {
        setIngredientsDBMap(Object.values(snapshot.data())[0]); //Sets ingredients array to input from database
      }
    } catch (e) {
      alert("Get in Request: " + e);
    }
  }
}

export {RequestLDB, setRequestLDB, getRequestsDB, addRequestDB, removeRequestDB, ingredientsMDB, getPantryDB};