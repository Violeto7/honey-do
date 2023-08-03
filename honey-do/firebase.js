import {
  setDoc,
  doc,
  getDoc,
  collection,
  getDocs
} from "firebase/firestore";
import { db, auth } from "./firebaseConfig"; //Imports database
import { useState, createContext } from "react";


export class User {
  constructor(name, uid, email, backlog) {
    this.name = name;
    this.uid = uid;
    this.backlog = backlog;
    this.email = email;
  }
  toString() {
    return (
      "Name: " + this.name + ", UID: " + this.uid + ", email: " + this.email + ", backlog: " + this.backlog);
  }
}

export const userConverter = {
  toFirestore: (user) => {
    return {
      name: user.name,
      uid: user.uid,
      backlog: user.backlog,
      email: user.email,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new User(
      data.name,
      data.uid,
      data.backlog,
      data.email
    );
  },
};

class Request {
  constructor(id, title, details){
      this.id = id;
      this.title = title;
      this.details = details;
  }
  toString() {
      return "Id: " + this.id + ', Title: ' + this.title + ', Details: ' + this.details;
  }
}
export const requestConverter = {
  toFirestore: (request) => {
    return {
      id: request.id,
      title: request.title,
      details: request.details,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Request(
      data.id, data.title, data.details
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

export async function getUserByEmail(email) {
  if(auth.currentUser){
    try{
      let querySnapshot = await getDocs(collection(db, "Users"));
      querySnapshot.forEach(function(doc) {
          if(doc.data().email == email){
            console.log('done');
            return new String(doc.id);
          }
      });
    }catch(e){
      alert(e);
    }
  }
}


export const userContext = createContext();