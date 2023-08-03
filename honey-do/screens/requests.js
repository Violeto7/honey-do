import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, Modal } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { addRequestDB, addRequestByID } from '../imports/backlog';

import { getUser,} from '../firebase';
import { collection, getDocs} from "firebase/firestore";
import { db, auth } from "../firebaseConfig"; //Imports database

import {styles} from '../assets/styles';

async function addReqByEmail(){
  if(auth.currentUser){
    try{
      let querySnapshot = await getDocs(collection(db, "Users"));
      querySnapshot.forEach(function(doc) {
          if(doc.data().email == "test@gmail.com"){
            addRequestByID(doc.id, "Az PC Cover 3");
          }
      });
    }catch(e){
      alert(e);
    }
  }
  
}

function Requests(){
  return(
      <View style={styles.container}>
        <Text>Welcome to Honey Do!</Text>
        <StatusBar style="auto" />
        <View style={styles.selections}>
          <TouchableOpacity style={styles.selectButton} onPress={addReqByEmail}>
            <Text style={styles.buttonText}>Maintenance Request</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.selectButton}>
            <Text style={styles.buttonText}>Act of Service Request</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
};

export {Requests};