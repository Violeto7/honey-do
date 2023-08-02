import {collection, addDoc, getDoc, doc, updateDoc, arrayRemove, arrayUnion} from "firebase/firestore";
import { useState, useEffect } from 'react';
import {db, auth} from '../firebaseConfig';//Imports database
//class for storing the Request info displayed on the Request search and cookbook page
class Request {
    constructor(id, title, details){
        this.id = id;
        this.title = title;
        this.details = details;
    }
}

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

async function addRequestDB(id) {
    //Function to add item into /Pantry/UID Requests array
    try {
        getRequestsDB();
        if (auth.currentUser) {

            setRequestLDB((oldIng) => [...oldIng, id]);
            let RequestDB = doc(db, "Requests", auth.currentUser.uid); //Database entry for the user
            await updateDoc(RequestDB, {
            RequestID: arrayUnion(id),
        });}
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

export {Request, RequestLDB, setRequestLDB, getRequestsDB, addRequestDB, removeRequestDB, ingredientsMDB, getPantryDB};