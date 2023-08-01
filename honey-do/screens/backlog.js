import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, Modal } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import {styles} from '../assets/styles';

function Backlog(){
    return(
        <View>
            <Text> Hello world!</Text>
        </View>
    );
};

export {Backlog};