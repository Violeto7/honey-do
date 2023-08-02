import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { StatusBar } from "expo-status-bar";
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
import  { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
// import * as firebase from "firebase";
import ProfileView, * as profile from './profile.js';
import { COLORS } from "../assets/style" ;

const LoginScreen = ({navigation}) => {
    // Variables for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    //Main login function
    const login = () =>{
      // reinit();
      // auth.setPersistence(auth.Auth.Persistence.LOCAL);
        //Uses auth from firebaseConfig file
        // auth  
            //Uses the corresponding login firebase sdk function
              signInWithEmailAndPassword(auth, email, password)
              .then(userCredentials => {
                  //Sets user var
                  const user = userCredentials.user;
                  //Prints to console
                  console.log('Logged in: ',user.email);
                  //Navigates back to profile screen
                  navigation.navigate("ProfileScreen");
              })
              //Error catches
              .catch(error => alert(error.message))
    }

  return (
    //Avoiding view is so keyboard does not cover the input fields
    <KeyboardAvoidingView
        style = {styles.container}
        behavior = "padding"
    >
        {/* Both the email and password text entry */}
        <View style={styles.inputContainer}>
            <TextInput 
                placeholder="Email"
                placeholderTextColor = {"white"}
                value={email}
                onChangeText={text => setEmail(text)}
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                placeholderTextColor = {"white"} 
                value={password}
                onChangeText={text => setPassword(text)}
                style={styles.input}
                secureTextEntry
            />
        </View>

        {/* The Login button that calls the login function up above. */}
        <View style={styles.loginBtn}>
            <TouchableOpacity 
                onPress={login}
                style={styles.loginBtnTxt}
            >
                <Text style={styles.loginBtnTxt}>Login</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.register}>
            <TouchableOpacity
                onPress={()=>navigation.navigate("RegisterScreen")}
                style={styles.registerBtn}
            >
                <Text style={styles.registerBtn}>Don't have an account?</Text>
            </TouchableOpacity>
        </View>


    </KeyboardAvoidingView>
  );
}

export default LoginScreen;

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
  register: {
    marginTop: 20,
  },
  registerBtn: {
    color: "grey",
  },
});
