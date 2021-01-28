import React from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';

const {height, width} = Dimensions.get('window');

export default function NewElementButton({text, onPress}){
    return(
            <Pressable
            style={styles.createNewContainer} 
            onPress={ () => onPress()}>
                <Icon name="pluscircleo" size={30} color="black" />
                <Text style={styles.createNewText}>{text}</Text>
            </Pressable>
    )
};

const styles = StyleSheet.create({
    createNewContainer:{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        margin: width * 0.01,
    },
    createNewText: {
      fontWeight: "bold",
      fontSize: 25,
      marginLeft: width * 0.01,
      color: "black"
    },
    
})
