import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ListStack from '../routes/ListStack';
import StoreStack from '../routes/StoreStack';

const Tab = createMaterialTopTabNavigator();

export default function HomeTabs(props){
    return(
        <NavigationContainer>   
            <Tab.Navigator>
                <Tab.Screen name="Listor" component={ListStack}/>
                {/* <Tab.Screen name="Butiker" component={StoreStack} /> */}
            </Tab.Navigator>
        </NavigationContainer>
    );
}