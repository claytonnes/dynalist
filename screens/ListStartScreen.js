import React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Pressable, Dimensions, ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import NewElementButton from '../components/NewElementButton';
import Storage from '../storage';
import DeleteButton from '../components/DeleteButton';

const {height, width} = Dimensions.get('window');
const storage = new Storage();

const ListElement = ({ listName, store, onPress, deleteFunction }) =>
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
            <DeleteButton deleteFunction={deleteFunction} size={30} color={"gray"}/>
        </Pressable>

    );
};



export default function ListStartScreen( {navigation} ) {
    //Hooks for managing state on lists
    const [lists, setLists] = useState([]);

    async function fetchLists(){
        setLists(await storage.getAllLists());
    }

    useEffect(() => {
        //Used for refreshing upon going back from ListScreen
        const unsubscribe = navigation.addListener('focus', () => {
          fetchLists();  
        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
      }, [navigation]);


    //Function for rendering a list element for the flatlist
    const renderListElement = ({ item }) =>{
        return(
        <ListElement
            key={item.id} 
            listName={item.name}
            store={item.store}
            onPress={ () => {
                navigation.navigate('ListScreen', {listId: item.id});
            }}
            deleteFunction={ async () => {
                //finding correct list to delete
                const listToDelete = lists.find((element) => element.id == item.id);
                let copyOfLists = lists;
                const index = copyOfLists.indexOf(listToDelete);
        
                //Removing list from copy of state list
                copyOfLists.splice(index, 1);
        
                //adding to storage and updating state
                await storage.deleteList(listToDelete.id);
                fetchLists();
            }}
            />
        )
    }


    return (
        <View style={styles.container}>
            <NewElementButton
            onPress={ () => {
                navigation.navigate('ListScreen')
            }}
            text="Skapa ny lista"
            />
            <Text style={styles.yourListsText}>Dina listor:</Text>
            <FlatList 
            style={styles.flatList}
            renderItem={renderListElement}
            data={lists}
            keyExtractor={(item) => item.id}
            />
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
      borderWidth: 0.2,
      alignItems: "center"
  },
  flatList: {
      height: height * 0.75
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


