import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ListStartScreen from '../screens/ListStartScreen';
import StoreStartScreen from '../screens/StoreStartScreen';
import Icon from 'react-native-vector-icons/AntDesign';

const Tab = createMaterialTopTabNavigator();

export default function HomeTabs(props){
    return(
        <Tab.Navigator>
            <Tab.Screen name="Listor" component={ListStartScreen}
            />
            <Tab.Screen name="Butiker" component={StoreStartScreen} />
        </Tab.Navigator>
    );
}