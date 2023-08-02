import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, Modal } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";

import {styles} from './assets/styles';

import { Requests } from './screens/requests';
import { Backlog } from './screens/backlog';
import ProfileView from './screens/profile.js';
import LoginScreen  from './screens/login';
import RegisterScreen from './screens/register';
import AccountView from './screens/account';

export default function App() {

  const Tab = createBottomTabNavigator();

  // Creates a stack navigation for the profile tab.
    const profStack = createStackNavigator();
    const ProfileStack = () => {
        return(
            // Just the screens within the profile tab as of rn.
            <profStack.Navigator initialRoutName="ProfileScreen" screenOptions={{headerShown:false}}>
                <profStack.Screen name="ProfileScreen" component={ProfileView}/>
                <profStack.Screen name="LoginScreen" component={LoginScreen}/>
                <profStack.Screen name="RegisterScreen" component={RegisterScreen}/>
                <profStack.Screen name="AccountScreen" component={AccountView}/>
            </profStack.Navigator>
        )
    }

  return (
    <NavigationContainer>
      <Tab.Navigator 
              screenOptions={({ route }) => ({
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: 'black',
                //Tab bar styles can be added here
                tabBarStyle: 
                {
                    paddingVertical: 5,
                    borderTopLeftRadius:15,
                    borderTopRightRadius:15,
                    backgroundColor: 'blue',
                    position:'absolute',
                    height:100,
                    borderTopWidth: 0, //this gets rid of the white line between the navbar and the content
                },
                // adjust how far the text is from the bottom of the screen
                tabBarLabelStyle:{paddingBottom:10},
              })}
          >
            <Tab.Screen 
                name="Requests" 
                component={Requests}
                options={{
                    title: "Requests",
                    headerStyle: {
                        backgroundColor: "black",
                        shadowColor: "black",
                        shadowOffset: {
	                        width: 0,
	                        height: 3,
                        },
                        shadowOpacity: 0.29,
                        shadowRadius: 4.65,
                        elevation: 7,
                        borderBottomWidth: 0,
                        borderColor: 'black'
                    },
                    
                }}
            />
            <Tab.Screen 
                name="Backlog" 
                component={Backlog}
                options={{
                    title: "Backlog",
                    headerStyle: {
                        backgroundColor: "black",
                        shadowColor: "black",
                        shadowOffset: {
	                        width: 0,
	                        height: 3,
                        },
                        shadowOpacity: 0.29,
                        shadowRadius: 4.65,
                        elevation: 7,
                        borderBottomWidth: 0,
                        borderColor: 'black'
                    },
                    
                }}
            />
            <Tab.Screen 
                name="ProfileView" 
                component={ProfileStack}
                options={{
                    title: "ProfileView",
                    headerStyle: {
                        backgroundColor: "black",
                        shadowColor: "black",
                        shadowOffset: {
	                        width: 0,
	                        height: 3,
                        },
                        shadowOpacity: 0.29,
                        shadowRadius: 4.65,
                        elevation: 7,
                        borderBottomWidth: 0,
                        borderColor: 'black'
                    },
                    
                }}
            />

        </Tab.Navigator>
    </NavigationContainer>
  );
}


