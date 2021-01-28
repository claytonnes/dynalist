import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListStartScreen from '../screens/ListStartScreen';
import ListScreen from '../screens/ListScreen';

const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator headerMode='none'>
        <Stack.Screen name="ListStart" component={ListStartScreen}/>
        <Stack.Screen name="ListScreen" component={ListScreen}/>
    </Stack.Navigator>
  );
}