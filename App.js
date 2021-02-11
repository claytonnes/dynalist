import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, StatusBar, SafeAreaView } from 'react-native';
import RootStack from './routes/RootStack';
import Storage from './storage';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const storage = new Storage();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <RootStack />
    </SafeAreaView> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
