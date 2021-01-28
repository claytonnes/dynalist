// import React from 'react';
// import { useState } from 'react';
// import { Text, View, StyleSheet, Pressable, Dimensions } from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
// import NewElementButton from '../components/NewElementButton';
// import Db from '../db';

// const {height, width} = Dimensions.get('window');
// const db = new Db();

// const ListElement = ({ id, storeName}) =>
// {
//     return(
//         <Pressable 
//         style={styles.elementContainer}
//         onPress={() => onPress()}
//         >
//             <View style={styles.leftElement}>
//                 <Text style={styles.listNameText}>{storeName}</Text>
//             </View>
//         </Pressable>

//     );
// };

// const renderListElements = (stores) => {
//     return stores.map(store => {
//         return (<ListElement id={store.id} storeName={store.name}/>)
//     })
// }

// export default function StoreStartScreen( { navigation } )  {
//     const [stores, setStores] = useState(db.getStores());
//     return (
//         <ScrollView style={styles.container}>
//             <NewElementButton 
//             onPress={() => {navigation.navigate('StoreScreen');}}
//             text='Ny butikslayout'
//             />
//             {renderListElements(stores)}
//         </ScrollView>
//     )
// }


// const styles = StyleSheet.create({
//     container:{
//         flex: 1,
//         backgroundColor: "#EBF5FF"
//     },
//     elementContainer: {
//         flex: 1,
//         flexDirection: "row",
//         margin: width * 0.01,
//         backgroundColor: "#EDEDF4",
//         borderWidth: 0.2
//     },
// })