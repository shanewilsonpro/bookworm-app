import React, { Component } from "react";
import { View, StyleSheet } from 'react-native';
import * as firebase from "firebase";
import 'firebase/auth';
import colors from "../../assets/colors";

class LoadingScreen extends Component {
    componentDidMount() {
        this.checkIfLoggedIn()
    }

    checkIfLoggedIn = () => {
        this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.navigation.navigate('HomeScreen', { user });
            } else {
                this.props.navigation.navigate('LoginStackNavigator');
            }
        });
    };

    componentWillUnmount = () => {
        this.unsubscribe();
    }

    render() {
        return (
            <View></View>
        )
    }
}

export default LoadingScreen;

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.bgMain
    }
})