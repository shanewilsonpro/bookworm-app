import React, { Component } from "react";
import { View, Text, StyleSheet } from 'react-native';

class BooksReadingScreen extends Component {
    render() {
        return (
            <View style={styles.container}><Text>hi</Text></View>
        )
    }
}

export default BooksReadingScreen;

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})