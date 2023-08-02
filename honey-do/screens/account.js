import {
  StyleSheet,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  KeyboardAvoidingView,
} from "react-native";
import { auth } from "../firebaseConfig";
import { useState, useEffect } from "react";
import { STYLE, COLORS } from "../assets/style";
import { PROFILESTYLE } from "../assets/profileStyle";
import { TextInput } from "@react-native-material/core";
import { sendPasswordResetEmail, updateProfile } from "firebase/auth";



function AccountView({ navigation }){
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [profURL, setProfURL]=useState("");

    const save = () =>{
        updateProfile(auth.currentUser, {
          displayName: displayName || auth.currentUser.displayName,
          photoURL: profURL || auth.currentUser.photoURL,
          email: email || auth.currentUser.email,
        })
          .then(() => {
            console.log("Profile updated.");
            alert("Profile changes saved!");
          })
          .catch((error) => {
            alert(error);
          });
    }

    const resetPass = () =>{
      sendPasswordResetEmail(auth, auth.currentUser.email)
        .then(() => {
          alert("Password reset email sent to: "+auth.currentUser.email)
        })
        .catch((error) => {
          alert(error);
        });  
    }

    return (
      <KeyboardAvoidingView style={styles.container}>

      <View style={styles.inputContainer}>
        <TextInput
          //Text field to change user's display name in db
          placeholder={"Display Name: " + auth.currentUser.displayName}
          placeholderTextColor={"black"}
          value={displayName}
          autoCapitalize="words"
          onChangeText={(text) => setDisplayName(text)}
        />

        <TextInput
          //Text field to change email in db
          placeholder={"email: " + auth.currentUser.email}
          placeholderTextColor={"black"}
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="words"
        />

        <TextInput
          //Text field to change email in db
          placeholder={"Profile image URL: " + auth.currentUser.photoURL}
          placeholderTextColor={"black"}
          value={profURL}
          onChangeText={(text) => setProfURL(text)}
        />
      </View>
        


        <View style={styles.saveBtn}>
            <TouchableOpacity onPress={resetPass} styles={styles.saveBtn}>
              <Text style={styles.saveBtnTxt}>Reset Password</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.saveBtn}>
            <TouchableOpacity onPress={save} styles={styles.saveBtnTxt}>
              <Text style={styles.saveBtnTxt}>Save</Text>
            </TouchableOpacity>
        </View>
            

      </KeyboardAvoidingView>
    );
}

export default AccountView;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#252434",
    paddingTop: 10,
    alignItems:"center"
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
  saveBtn: {
    width: "60%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.tealGreen,
    borderRadius: 10,
    marginTop: 10,
    padding:5
  },
  saveBtnTxt: {
    color: "white",
    padding: 5,
    fontWeight: "bold",
    fontSize: 17,
    width: "100%",
    textAlign: "center",
  },
});
