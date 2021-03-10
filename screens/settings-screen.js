import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import CustomActionButton from "../components/custom-action-button";
import colors from "../assets/colors";
import * as firebase from "firebase";
import 'firebase/auth';

class SettingsScreen extends Component {

    signOut = async () => {
        try {
            await firebase.auth().signOut()
            this.props.navigation.navigate('WelcomeScreen')
        } catch(error) {
            alert('Unable to sign out right now.')
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <CustomActionButton
                    style={styles.signupButton}
                    title="Log Out"
                    onPress={this.signOut}>
                    <Text style={styles.signupButtonText}>Log Out</Text>
                </CustomActionButton>
            </View>
        )
    }
}

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.bgMain,
    },
    signupButton: {
        width: 200,
        backgroundColor: 'transparent',
        borderWidth: 0.5,
        borderColor: colors.bgError
    },
    signupButtonText: {
        fontWeight: '300',
        color: 'white'
    }
});

