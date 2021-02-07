import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet, Pressable, Dimensions } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import NewElementButton from '../components/NewElementButton';
import Storage from '../storage';
import DeleteButton from '../components/DeleteButton';

const {height, width} = Dimensions.get('window');
const storage = new Storage();

const ListElement = ({ storeName, onPress, deleteFunction }) =>
{
    return(
        <Pressable style={styles.elementContainer} onPress={() => onPress()}>
            <View style={styles.leftElement}>
                <Text style={styles.listNameText}>{storeName}</Text>
            </View>
            <DeleteButton size={25} color={"gray"} style={styles.deleteButton}
            deleteFunction={deleteFunction}/>
        </Pressable>

    );
};

export default function StoreStartScreen( { navigation } )  {
    const [stores, setStores] = useState([]);

    async function fetchStores(){
        setStores(await storage.getStores());
    };

    useEffect(() => {
        //Used for refreshing upon navigation to this screen
        const unsubscribe = navigation.addListener('focus', () => {
          fetchStores();
        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
      }, [navigation]);

    const renderStore = ({ item }) => (
        <ListElement storeName={item.name} key={item.name}
        onPress={() => {
            navigation.navigate('StoreScreen', {storeName: item.name});
        }}
        deleteFunction={ async () => {
            let copy = stores;
            const store = copy.find((store) => store.name == item.name);
            copy.splice(copy.indexOf(store),1);

            await storage.deleteStore(item.name);
            fetchStores();
        }}
        />
    );


    return (
        <View style={styles.container}>
            <NewElementButton 
            onPress={() => {navigation.navigate('StoreScreen');}}
            text='Ny butikslayout'
            />
            <FlatList
            data={stores}
            renderItem={renderStore}
            keyExtractor={(item) => item.name}
            style={styles.flatList}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#EBF5FF"
    },
    deleteButton: {
        flex: 1,
    },
    flatList: {
        height: height * 0.75,
    },
    elementContainer: {
        height: height * 0.05,
        flexDirection: "row",
        margin: width * 0.01,
        backgroundColor: "#EDEDF4",
        borderWidth: 0.2,
        alignItems: "center"
    },
    leftElement: {
        flex: 13
    },
    listNameText:{
        fontSize: 24,
        fontWeight: "bold",
        paddingLeft: width * 0.01
    }
})