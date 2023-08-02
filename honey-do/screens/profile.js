import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Text, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useState, useEffect } from 'react';
import { STYLE, COLORS } from '../assets/style';
import { PROFILESTYLE } from '../assets/profileStyle';
import { auth, db } from "../firebaseConfig";//Imports database
import { collection, addDoc, setDoc, doc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";

import Modal from "react-native-modal";

//import CheckBox from "react-native-elements" ;

//COLLECTION NAME FOR DATABASE IS "Preferences"

function ProfileView({ navigation }) {
  const [preferencesModalState, setPreferencesModalState] = useState(false);

  const [signOutModalState, setSignOutModalState] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [profileModalState, setProfileModalState] = useState(false);


  useEffect(() => {
    //Unsubscribe var so the listener does not keep listening even when leaving screen.
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) {
        //If logged in, sets the state to true.
        setShowLogout(true);
      }
    });
    //returns the unsubscribe variable to stop listening.
    return unsub;
  }, []); //Empty array so it only runs once

  const signOutBtnHandler = () => {//Logout function
    //Uses auth from firebaseConfig
    auth
      .signOut()
      .then(() => {
        //Sets state to false and prints to console
        setShowLogout(false);
        //setSignOutModalState(true); not sure if this is needed
        console.log("User signed out.");
      })
      .catch((error) => alert(error.message));
  };


  return (
    <SafeAreaView style={STYLE.appContainer}>
      <SafeAreaView style={PROFILESTYLE.profileContainer}>
        <TouchableOpacity
          onPress={() => {
            setProfileModalState(true);
          }}
        >
            <Image
              style={PROFILESTYLE.profileImage}
              source={require("../assets/accountIcon.png")}
            />
        </TouchableOpacity>

        <Modal
          isVisible={profileModalState}
          propagateSwipe={true}
          animationInTiming={400}
          animationOutTiming={600}
          backdropTransitionOutTiming={600}
          onBackdropPress={() => {
            setProfileModalState(false);
          }}
          scrollOffset={1000}
        >
          <SafeAreaView style={PROFILESTYLE.modalContainer}>
            <SafeAreaView style={PROFILESTYLE.modal}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  alignItems: "center",
                  margin: 20,
                }}
              >
                Set Profile Picture
              </Text>
            </SafeAreaView>
          </SafeAreaView>
        </Modal>

        {!showLogout ? ( //Will not show default message is user is logged in
          <Text style={PROFILESTYLE.profileName}>Account Name</Text>
        ) : null}
        {showLogout ? (
          <Text style={PROFILESTYLE.profileName}>{auth.currentUser.email}</Text> //This can be changed later to display user's display name
        ) : null}
      </SafeAreaView>

      <SafeAreaView style={PROFILESTYLE.profileOptions}>
        {showLogout ? ( //Will not show account button if not logged in
          <TouchableOpacity //This is the account button
            style={PROFILESTYLE.touchableOpacity}
            onPress={() => navigation.navigate("AccountScreen")} //Navigates to account screen on button press
          >
            <Image
              style={PROFILESTYLE.optionImage}
              source={require("../assets/accountIcon.png")}
            />
            <Text style={PROFILESTYLE.optionText}>Account Settings</Text>
          </TouchableOpacity>
        ) : null}
        {showLogout ? ( //Will not show logout button if user is logged in
          <TouchableOpacity //This is the sign out button
            style={PROFILESTYLE.touchableOpacity}
            onPress={signOutBtnHandler}
          >
            <Image
              style={PROFILESTYLE.optionImage}
              source={require("../assets/signOutIcon.png")}
            />
            <Text style={PROFILESTYLE.optionText}>Sign out</Text>
          </TouchableOpacity>
        ) : null}
        <Modal transparent={true} visible={signOutModalState}>
          <TouchableOpacity
            style={PROFILESTYLE.modalContainer}
            activeOpacity={1}
            onPress={() => {
              setSignOutModalState(false);
            }}
          >
            <TouchableWithoutFeedback>
              <SafeAreaView style={PROFILESTYLE.modal}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    alignItems: "center",
                    margin: 20,
                  }}
                >
                  Sign Out Modal View
                </Text>
              </SafeAreaView>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>

        {!showLogout ? ( //Only shows login button if user is not logged in
          <TouchableOpacity
            style={PROFILESTYLE.touchableOpacity}
            onPress={() => navigation.navigate("LoginScreen")}
          >
            <Image
              style={PROFILESTYLE.optionImage}
              source={require("../assets/loginIcon.png")}
            />
            <Text style={PROFILESTYLE.optionText}>Login</Text>
          </TouchableOpacity>
        ) : null}
      </SafeAreaView>
    </SafeAreaView>
  );
}

export default ProfileView;
const styles = StyleSheet.create({
  dropdown2BtnStyle: {
    width: '80%',
    height: 50,
    backgroundColor: '#444',
    borderRadius: 8,
  },
  dropdown2BtnTxtStyle: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dropdown2DropdownStyle: {
    backgroundColor: '#444',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  dropdown2RowStyle: { backgroundColor: '#444', borderBottomColor: '#C5C5C5' },
  dropdown2RowTxtStyle: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  MainContainer: {
    flex: 1,
    padding: 12,
    backgroundColor: 'white'
  },
  URLImage:{
    width:"96px",
    height:"96px",
  }
});
