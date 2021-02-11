import React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Storage from '../storage';

const storage = new Storage();
const {height, width} = Dimensions.get('window');


const StoreElement = ( {name, selected, onPress} ) => {
    return(
        <Pressable 
        style={
            [styles.storeContainer, selected ? {backgroundColor: "blue"} : {}]
        }
        onPress={onPress}>
            <Text style={styles.storeNameText}>{name}</Text>
        </Pressable>
    )
}

async function getStore(storeName){
    return await storage.getStore(storeName)
}

function ChooseStoreScreen( { route, navigation }) {
    const[stores, setStores] = useState([]);
    const[selected, setSelected] = useState('');
    const { setStore } = route.params;

    async function fetchStores(){
        setStores(await storage.getStores());
    }

    useEffect(() => {
        fetchStores();
        setSelected(route.params.store);
    }, [])

    const renderStore = ( {item} ) => (
        <StoreElement 
        name={item.name} 
        selected={selected == item.name ? true : false}
        onPress={ () => {
            setSelected(item.name);
        }}
        />
    )

        return (
            <View style={styles.container}>
                <Text style={styles.titleText}>Välj butikslayout</Text>
                <FlatList 
                data={stores}
                renderItem={renderStore}
                keyExtractor={item => item.name}
                style={styles.flatList}
                />
                <View style={styles.buttonContainer}>
                    <Pressable 
                    style={styles.saveButton}
                    onPress={ async () =>{
                        setStore(await getStore(selected));
                        navigation.goBack();
                    }}
                    >
                        <Text>Spara</Text>
                    </Pressable>
                </View>

            </View>

        );
}

export default ChooseStoreScreen;

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 0.1,
        padding: 20,
        alignItems: "center"
    },
    container: {
        flex: 1,
        justifyContent: "center"
    },
    flatList: {
        marginTop: 10,
        flex: 0.75,
    },
    saveButton:{
        flex: 1,
        width: width * 0.5,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        borderWidth: 1,
    },
    storeContainer:{
        flex: 0.2,
        backgroundColor: "white"
    },
    storeNameText: {
        fontSize: 24,
        fontWeight: "bold",
        marginLeft: 10
    },
    titleText: {
        fontSize: 24,
        fontWeight: "bold",
        marginLeft: 10,
        marginTop: 10
    }
})

/*
import React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Storage from '../storage';

const storage = new Storage();
const {height, width} = Dimensions.get('window');


const StoreElement = ( {name, selected, onPress} ) => {
    return(
        <Pressable 
        style={
            [styles.storeContainer, selected ? {backgroundColor: "blue"} : {}]
        }
        onPress={onPress}>
            <Text style={styles.storeNameText}>{name}</Text>
        </Pressable>
    )
}

//Function for assigning 
async function setSelectedToList(listId, selected){
    let list = await storage.getList(listId);
    list.store = selected;
    console.log(list);
    storage.setList(list.id, list.name, list.list, list.store);
}

function ChooseStoreScreen( { route, navigation }) {
    const[stores, setStores] = useState([]);
    const[selected, setSelected] = useState('');
    const { setStore } = route.params;
    
    
    async function fetchStores(){
        setStores(await storage.getStores());
    }

    useEffect(() => {
        fetchStores();
        setSelected(route.params.store);
    }, [])

    const renderStore = ( {item} ) => (
        <StoreElement 
        name={item.name} 
        selected={selected == item.name ? true : false}
        onPress={ () => {
            setSelected(item.name);
        }}
        />
    )

        return (
            <View style={styles.container}>
                <Text style={styles.titleText}>Välj butikslayout</Text>
                <FlatList 
                data={stores}
                renderItem={renderStore}
                keyExtractor={item => item.name}
                style={styles.flatList}
                />
                <View style={styles.buttonContainer}>
                    <Pressable 
                    style={styles.saveButton}
                    onPress={ async () =>{
                        await setSelectedToList(route.params.list, selected);
                        setStore(selected);
                        navigation.goBack();
                    }}
                    >
                        <Text>Spara</Text>
                    </Pressable>
                </View>

            </View>

        );
}

export default ChooseStoreScreen;

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 0.1,
        padding: 20,
        alignItems: "center"
    },
    container: {
        flex: 1,
        justifyContent: "center"
    },
    flatList: {
        marginTop: 10,
        flex: 0.75,
    },
    saveButton:{
        flex: 1,
        width: width * 0.5,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        borderWidth: 1,
    },
    storeContainer:{
        flex: 0.2,
        backgroundColor: "white"
    },
    storeNameText: {
        fontSize: 24,
        fontWeight: "bold",
        marginLeft: 10
    },
    titleText: {
        fontSize: 24,
        fontWeight: "bold",
        marginLeft: 10,
        marginTop: 10
    }
})*/