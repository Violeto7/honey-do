import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, Modal } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import {styles} from '../assets/styles';

function Requests(){
    return(
        <View style={styles.container}>
          <Text>Welcome to Honey Do!</Text>
          <StatusBar style="auto" />
          <View style={styles.selections}>
            <TouchableOpacity style={styles.selectButton}>
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