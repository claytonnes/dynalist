import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet, Dimensions, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import CheckBox from '@react-native-community/checkbox';
import Db from '../db';
import Products from '../generateJson';


const {height, width} = Dimensions.get('window');
const db = new Db();
const prods = new Products();

const vegetables = prods.generateVegetableProducts();
const meat = prods.generateMeatProducts();
const dairy = prods.generateDairyProducts();

async function asd() {
    return await db.getData("65f085fa-b6f3-4827-987e-742f0b89ec42");
}

const ListElement = ({id, product, checked}) => {  
    return(
    <View style={styles.listElementContainer}>
        <CheckBox 
        value={checked}
        />
        <Text>{product}</Text>
    </View>)
}

const renderElement = ({ item }) => 
    <ListElement 
    id={item.id}
    product={item.product}
    checked={item.checked}
    />;

export default function ListScreen({ route, navigation }) {
    //Manages the listname TextInput
    const [listNameInput, setListNameInput] = useState('');
    //Manages the listElement TextInput
    const [listElementInput, setListElementInput] = useState('');
    let listId;
    //Checking if parameters were sent
    if(route.params != null){
        let listId = route.params.listId;
    }

    //Managing list elements in state
    //If param with existing listId were sent, previous elements added, else not
    const [listElements, setListElements] = useState(listId == null ? [] : db.get(listId));

    //Ref + function used for auto-focusing textbox upon sumbitting new element
    const textInput = useRef(null);
    const focusTextInput = () => {
        textInput.current.focus();
    }

    useEffect(() => {
        setTimeout( ()=>{ focusTextInput(); }, 20);
    })


    const productTextInput = 
    <TextInput
    ref={textInput}
    style={styles.listElementInput}
    placeholder={"Klicka för att lägga till en ny vara"}
    placeholderTextColor={"gray"}
    value={listElementInput}
    onChangeText={(text) => setListElementInput(text)}
    onSubmitEditing={() => {
        let copy = listElements;
        copy.push({id: uuidv4(), product: listElementInput, checked: false});
        setListElements(copy);
        setListElementInput('');
    }}/>;
    return (
        <View style={styles.container}>
            <TextInput
            style={styles.listNameInput}
            placeholder={"Listnamn"}
            placeholderTextColor={"gray"}
            value={listNameInput}
            onChangeText={(text) => setListNameInput(text)}
            />

            <FlatList
            style={styles.flatList} 
            data={listElements}
            renderItem={renderElement}
            keyExtractor={(item) => item.id}
            ListFooterComponent={productTextInput}
            removeClippedSubviews={false}
            keyboardShouldPersistTaps="always"
            />
     
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                style={styles.saveButton}
                onPress={() => {
                    db.setList(uuidv4(), listElements);
                    navigation.pop();
                }}>
                    <Text>Spara</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        height: height * 0.08,
        alignItems: "center",
        paddingBottom: height * 0.04,
        marginTop: height * 0.03
    },
    checkBox: {
        flex: 0.1,
        color: "blue"
    },
    container: {
        flex: 1,
    },
    flatList:{
        maxHeight: height * 0.8,
    },
    listElementInput: {
        height: 0.05*height,
        marginLeft: width * 0.01
    },
    listElementContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center"
    },
    listNameInput: {
        height: 0.07*height,
        fontWeight: "bold",
        fontSize: 25,
        marginLeft: width * 0.01,
        marginRight: width * 0.01,
        borderBottomWidth: 1,
        borderBottomColor: "lightgray"
    },
    saveButton:{
        position: "absolute",
        height: height * 0.05,
        width: width * 0.4,
        borderWidth: 0.5,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    }
    
})