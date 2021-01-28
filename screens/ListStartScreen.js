import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Text, View, StyleSheet, Pressable, Dimensions } from 'react-native';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { set } from 'react-native-reanimated';
import NewElementButton from '../components/NewElementButton';
import Db from '../db';

const {height, width} = Dimensions.get('window');
const db = new Db();

const DATA = [
    {
        id: 1,
        name: "lista",
        store: "Ica hörnan",
        date: '21/7-2020'
    },
    {
        id: 2,
        name: "lista",
        store: "Ica hörnan",
        date: '21/7-2020'
    },
    {
        id: 3,
        name: "lista",
        store: "Ica hörnan",
        date: '21/7-2020'
    },
    {
        id: 4,
        name: "lista",
        store: "Ica hörnan",
        date: '21/7-2020'
    },
    {
        id: 5,
        name: "lista",
        store: "Ica hörnan",
        date: '21/7-2020'
    },
    {
        id: 6,
        name: "lista",
        store: "Ica hörnan",
        date: '21/7-2020'
    },
    {
        id: 7,
        name: "lista",
        store: "Ica hörnan",
        date: '21/7-2020'
    },   
]

const ListElement = ({ listName, store, date, onPress }) =>
{
    return(
        <Pressable 
        style={styles.elementContainer}
        onPress={() => onPress()}
        >
            <View style={styles.leftElement}>
                <Text style={styles.listNameText}>{listName}</Text>
                <Text style={styles.listStoreText}>{store}</Text>
            </View>
            <Text style={styles.listDateText}>{date}</Text>
        </Pressable>

    );
};

const renderListElements = async (items, navigation) => {
    return items.map((item) => {
        return(
            <ListElement
            key={item.id} 
            listName={item.name}
            store={item.store}
            date={item.date}
            onPress={ () => {
                navigation.navigate('ListScreen', {listId: item.id});
            }}
            />)
    })
}

export default function ListStartScreen( {navigation} ) {
    const [lists, setLists] = useState([]);
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        async function fetchLists(){
            setLists(await db.getAllLists())               
        }
        async function confirmFetched(){    
            console.log("hello");
            setFetched(true);
        }
        fetchLists();
        
    }, [])

    let flatList = fetched ?             
    <FlatList 
    style={flatList}
    renderItem={renderListElements}
    data={lists}
    keyExtractor={item => item.id}
    /> : <></>;

    return (
        <View style={styles.container}>
            <NewElementButton
            onPress={ () => {
                navigation.navigate('ListScreen')
            }}
            text="Skapa ny lista"
            />
            <Text style={styles.yourListsText}>Dina listor:</Text>
            {flatList}
        </View>          
    );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#EBF5FF"
    },
  elementContainer: {
      flex: 1,
      flexDirection: "row",
      margin: width * 0.01,
      backgroundColor: "#EDEDF4",
      borderWidth: 0.2
  },
  flatList: {
      flex: 1,
  },
  leftElement: {     
      flex: 1,
      flexDirection: "column",
      paddingLeft: 3
  },
  listDateText: {
      fontWeight: "bold"
  },
  listNameText: {
      fontWeight: "bold",
      fontSize: 25
  },
  listStoreText: {
      fontWeight: "bold",
  },
  yourListsText: {
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: width * 0.01,
  }
})

// 0C1B33
// DBFE87


