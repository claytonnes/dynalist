import React from 'react';
import { useEffect } from 'react';
import { useState} from 'react';
import { Pressable, View, StyleSheet, Dimensions, Text, TextInput, Button } from 'react-native';
import DraggableFlatList from "react-native-draggable-flatlist";
import productCategories from '../productCategories';
import Storage from '../storage';
import { v4 as uuidv4 } from 'uuid';

const storage = new Storage();

const {height, width} = Dimensions.get('window');

const renderCategoryCard = ( {item, index, drag} ) => {
    return(
    <Pressable onLongPress={drag} style={[styles.categoryCard]}>
        <Text style={styles.categoryText}>{item.category}</Text>
    </Pressable>
    )
}

export default function StoreScreen({ navigation, route }) {
    const [categories, setCategories] = useState([]);
    const [storeName, setStoreName] = useState('');

    //Checking if parameters were sent
    let name;
    if(route.params != null){
        name = route.params.storeName;
    }

    useEffect(() => {
        async function fetchStore(){
            if(name != null){
                let store = await storage.getStore(name);
                setCategories(await store.order);
                setStoreName(await store.name);
            }
            else{
                setCategories(productCategories().order);
            }
        }
        fetchStore();
    }, [])
    return (
        <View style={styles.container}>

            <Button 
            title="Spara"
            color="#90E39A"
            style={styles.button}
            marginTop={height * 0.01}
            onPress={async () => {
                await storage.setStore(storeName==null ? 'Namnlös Butikslayout' : storeName, categories);
                navigation.goBack();
            }}
            />

            <TextInput
            style={styles.textInput}
            placeholder={"Butiksnamn"}
            value={storeName}
            onChangeText={(text) => setStoreName(text)}
            />

            <DraggableFlatList
            initialNumToRender={15}
            data={categories}
            renderItem={renderCategoryCard}
            keyExtractor={(item) => item.key}
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