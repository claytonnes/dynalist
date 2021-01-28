import React from 'react';
import { useState, state } from 'react';
import { Pressable, View, StyleSheet, Dimensions, Text, TextInput, Button } from 'react-native';
import DraggableFlatList from "react-native-draggable-flatlist";
import productCategories from '../productCategories';
import Db from '../db';

const db = new Db();

const {height, width} = Dimensions.get('window');

const renderCategoryCard = ( {item, index, drag} ) => {
    return(
    <Pressable onLongPress={drag} style={[styles.categoryCard]}>
        <Text style={styles.categoryText}>{item.category}</Text>
    </Pressable>
    )
}

export default function StoreScreen(props) {
    const [categories, setCategories] = useState(productCategories);
    const [storeName, setStoreName] = useState('');
    return (
        <View style={styles.container}>

            <Button 
            title="Spara"
            color="#90E39A"
            style={styles.button}
            marginTop={height * 0.01}
            onPress={() => {
                db.setStore('1', storeName, categories);
                props.navigation.navigate('StoreStart');
            }}
            />

            <TextInput
            style={styles.textInput}
            placeholder={"Butiksnamn"}
            onChangeText={(text) => setStoreName(text)}
            />

            <DraggableFlatList
            data={categories}
            renderItem={renderCategoryCard}
            keyExtractor={(item) => `draggable-item-${item.key}`}
            onDragEnd={({ data }) => {setCategories(data);}}
            />
        
        </View>
    );
}

const styles = StyleSheet.create({
    categoryCard: {
        height: height * 0.045,
        borderRadius: 10,
        width: width * 0.7,
        padding: 2,
        backgroundColor: "#CE4760",
        borderBottomWidth: 0.2,
        borderColor: "white",
        margin: 3,
        justifyContent: "center",
        alignItems: "center"
    },
    categoryText: {
        color: "white",
        fontSize: 25,
        fontWeight: "bold"
    },
    container: {
        backgroundColor: "white",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    textInput: {
        alignItems: "center",
        borderBottomWidth: 1,
        height: 50,
        width: width * 0.8,
        borderBottomColor: "lightgray",
        fontSize: 20,
        marginBottom: height * 0.04
    }
})