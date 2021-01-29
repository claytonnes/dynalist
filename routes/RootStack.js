import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeTabs from '../routes/HomeTabs';
import StoreScreen from '../screens/StoreScreen';
import ListScreen from '../screens/ListScreen';


const Stack = createStackNavigator();

export default function RootStack() {
  return (
    <NavigationContainer>
        <Stack.Navigator headerMode='none'>
            <Stack.Screen name="Start" component={HomeTabs}/>
            <Stack.Screen name="StoreScreen" component={StoreScreen}/>
            <Stack.Screen name="ListScreen" component={ListScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}