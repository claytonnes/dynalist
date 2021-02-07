import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet, Dimensions, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import CheckBox from '@react-native-community/checkbox';
import Storage from '../storage';
import DeleteButton from '../components/DeleteButton';

const {height, width} = Dimensions.get('window');
const storage = new Storage();

const ListElement = ({product, checked, deleteFunction}) => {  
    return(
    <View style={styles.listElementContainer}>
        <CheckBox 
        value={checked}
        />
        <View style={styles.listElementTextContainer}>
            <Text>{product}</Text>
        </View>
        <DeleteButton deleteFunction={deleteFunction}
        size={20} color={"gray"} style={styles.deleteButton} />
    </View>)
}

export default function ListScreen({ route, navigation }) {
    //Manages the listname TextInput
    const [listNameInput, setListNameInput] = useState('');
    //Manages the listElement TextInput
    const [listElementInput, setListElementInput] = useState('');
    //Manages focus of the text input for assigning list name
    const [listNameInputFocused, setListNameInputFocus] = useState(false);
    //Managing list state
    //If param with existing listId were sent, previous elements added, else not
    const [list, setList] = useState({});
    //Manages store object for this list
    const [store, setStore] = useState({});

    //Checking if parameters were sent
    let listId;
    if(route.params != null){
        listId = route.params.listId;
    }
    //Ref + function used for auto-focusing textbox upon sumbitting new element
    const textInput = useRef(null);

    const renderElement = ({ item }) => (
        <ListElement 
        product={item.product}
        checked={item.checked}
        deleteFunction={async () => {
            let le = list.list.find((element) => element.id == item.id);
            let copyOfList = list;
            copyOfList.list.splice(copyOfList.list.indexOf(le), 1);
            setList(copyOfProducts);
        }}
        />)

    async function updateData(){
        let listObject = await fetchList();
        setList(await listObject);
        setListNameInput(await listObject.name);
        const store = await fetchStore(await listObject.store);
        setStore(await store);
    }

    async function fetchList(){
        //Checking if listId was sent as a parameter, if so
        //gets the listObject for that listId from storage
        if(listId != null){
            return await storage.getList(listId);
        }
        else{
            return{id: "", name:"", list: [], store:""};
        }
    }

    async function fetchStore(storeName){
        const store = await storage.getStore(storeName);
        if(store == null){
            return await storage.getDefaultStore()
        }
        else{
            return await store;
        }
    }

    useEffect(() => {
        //If the nameInput is not focused, then set focus to adding next item
        if(!listNameInputFocused){
            setTimeout( () => {textInput.current.focus();}, 20);
        }
    })

    useEffect(() => {
        //Used for refreshing upon going back from ListScreen
        const unsubscribe = navigation.addListener('focus', () => {
            updateData();
        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
      }, [navigation]);

    const productTextInput = 
        <TextInput
        ref={textInput}
        style={styles.listElementInput}
        placeholder={"Skriv här för att lägga till en ny vara"}
        placeholderTextColor={"gray"}
        value={listElementInput}
        onChangeText={(text) => setListElementInput(text)}
        onSubmitEditing={() => {
            if(listElementInput != ''){
                let copy = list;
                copy.list.push({id: uuidv4(), product: listElementInput, checked: false});
                setList(copy);
                setListElementInput('');
            }       
        }}/>;

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <TextInput
                style={styles.listNameInput}
                placeholder={"Listnamn"}
                placeholderTextColor={"gray"}
                value={listNameInput}
                onChangeText={(text) => setListNameInput(text)}
                onFocus={() => setListNameInputFocus(true)}
                onBlur={() => setListNameInputFocus(false)}
                />
                <TouchableOpacity 
                style={styles.chooseStoreButton}
                onPress={() => navigation.navigate('ChooseStoreScreen', {list: list.id, store: store.name})}
                >
                    <Text style={styles.chooseStoreText}>Butikslayout</Text>
                    <Text style={styles.chosenStoreText}>{store==null ? '' : store.name}</Text>
                </TouchableOpacity>
            </View>

            <FlatList
            style={styles.flatList} 
            data={list.list}
            renderItem={renderElement}
            keyExtractor={(item) => item.id}
            ListFooterComponent={productTextInput}
            removeClippedSubviews={false}
            keyboardShouldPersistTaps="always"
            />
     
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                style={styles.saveButton}
                onPress={ async () => {
                    //If listId was not sent as parameter, generate new Id from new list
                    //else assign current listId in order to update existing list
                    //store in storage
                    await storage.setList(listId == null ? uuidv4() : listId, listNameInput, list.list, store.name);
                    navigation.goBack();
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
    container: {
        flex: 1,
    },
    chooseStoreButton: {
        flex: 0.3,
        borderLeftWidth: 1,
        borderColor: "lightgray",
        padding: 5
    },
    chooseStoreText: {
        fontSize: 13,
        fontWeight: "bold",
        color: "gray"
    },
    chosenStoreText: {
        fontSize: 16,
        fontWeight: "bold"
    },
    deleteButton: {
        flex: 1
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
        alignItems: "center",
    },
    listElementTextContainer: {
        flex: 12
    },
    listNameInput: {
        flex: 0.7,
        height: 0.07*height,
        fontWeight: "bold",
        fontSize: 25,
        marginLeft: width * 0.01,
        marginRight: width * 0.01,
    },
    saveButton:{
        position: "absolute",
        height: height * 0.05,
        width: width * 0.4,
        borderWidth: 0.5,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    topContainer: {
        flexDirection: "row",
        height: height * 0.1,
        borderBottomWidth: 1,
        borderColor: "lightgray",
        alignItems: "center"
    }
    
})