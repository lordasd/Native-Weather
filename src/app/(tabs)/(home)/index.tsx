import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import HomeScreen from '../../../components/HomeScreen'; // Update with your screen import

const App = () => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="skyblue" barStyle="dark-content" />
            <HomeScreen />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'powderblue', // This sets the background color for the entire app
    },
});

export default App;
