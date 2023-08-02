import {
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db, auth } from "./firebaseConfig"; //Imports database
import { useState, createContext } from "react";


export class User {
  constructor(name, uid, backlog) {
    this.name = name;
    this.uid = uid;
    this.backlog = backlog;
  }
  toString() {
    return (
      "Name: " + this.name + ", UID: " + this.uid + ", backlog: " + this.backlog);
  }
}

export const userConverter = {
  toFirestore: (user) => {
    return {
      name: user.name,
      uid: user.uid,
      backlog: user.backlog,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new User(
      data.name,
      data.uid,
      data.backlog
    );
  },
};

//Updates user object in database
export async function postUser(userDB){//Sends user object to database
  if(auth.currentUser){
    try{
      const ref = doc(db, "Users", auth.currentUser.uid).withConverter(userConverter);
      await setDoc(ref, userDB);
    }catch(e){
      alert(e);
    }
  }
}

//Sets userDB hook to user object from database
export async function getUser(){
    const [userDB, setUserDB] = useState();
    if(auth.currentUser){
      try{
        const ref = doc(db, "Users", auth.currentUser.uid).withConverter(userConverter);
        const docSnap = await getDoc(ref);
        if(docSnap.exists){
          setUserDB(docSnap.data());
            return userDB;
        }else{
          console.log("No such doc.");
        }
      }catch(e){
        alert(e);
      }
    }
  }


export const userContext = createContext();