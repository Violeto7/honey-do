import { StatusBar } from "expo-status-bar";
import { COLORS } from "../assets/style" ;
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { auth, db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import {userConverter, User} from '../firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";


  const RegisterScreen = ({navigation}) => {
    // Just variables for the email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    //The main register function
    const signUp = () => {
      // Uses the auth variable made int he firebaseConfig file
      // auth
        //Uses the firebase sdk functions to create an account 
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          //Sets user and prints to console
          createDB();
          console.log('Registered: ',user.email, "with uid: ", auth.currentUser.uid);
          //Switches back to profile screen when done.
          navigation.navigate("ProfileScreen");
        })
        .catch((error) => alert(error.message));


    };

    async function createDB(){//This function creates a database entry in each collection when a user registers.
      if(auth.currentUser){
        await setDoc(
          doc(db, "Users", auth.currentUser.uid).withConverter(userConverter),
          new User(
            "name",
            auth.currentUser.uid,
            auth.currentUser.email,
            [],
            [],
            {}
          )
        );

        await setDoc(doc(db, "Requests", auth.currentUser.uid), {
          Requests: [],
        });
      
        console.log("User database entry creates for: ", auth.currentUser.email);
      }
    }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {/* Both the email and password text entry */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          placeholderTextColor = {"white"}
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor = {"white"}
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      {/* The register button that calls the register function up above. */}
      <View style={styles.loginBtn}>
        <TouchableOpacity onPress={signUp} style={styles.loginBtnTxt}>
          <Text style={styles.loginBtnTxt}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );

}

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#252434",
    alignItems: "center",
    paddingTop: 10,
  },
  inputContainer: {
    width: "90%",
    verticalAlign: "top",
  },
  input: {
    borderRadius: 8,
    margin: 10,
    backgroundColor: "#575d66",
    padding: 10,
  },
  loginBtn: {
    width: "60%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.tealGreen,
    borderRadius: 10,
    marginTop: 10,
  },
  loginBtnTxt: {
    color: "white",
    padding: 5,
    fontWeight: "bold",
    fontSize: 17,
    width: "100%",
    textAlign: "center",
  },
});

