import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, StatusBar, SafeAreaView } from 'react-native';
import HomeTabs from './routes/HomeTabs';


export default function App() {
  return (
    <SafeAreaView style={styles.container}>
    <HomeTabs />
    </SafeAreaView> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
