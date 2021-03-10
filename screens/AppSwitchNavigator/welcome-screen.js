import React from 'react'
import { View, StyleSheet, Text } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import colors from "../../assets/colors";
import CustomActionButton from "../../components/custom-action-button";

export default class WelcomeScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.iconContainer}>
                    <Ionicons name="ios-bookmarks" size={150} color={colors.logoColor} />
                    <Text style={styles.iconText}>Bookworm</Text>
                </View>
                <View style={styles.buttonsContainer}>
                    <CustomActionButton style={styles.loginButton} title="Login" onPress={() => this.props.navigation.navigate('LoginScreen')}>
                        <Text style={styles.loginButtonText}>Login</Text>
                    </CustomActionButton>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgMain,
    },
    iconContainer: {
        flex: 1,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconText: {
        fontSize: 50,
        fontWeight: '300',
        color: 'white',
        marginTop: 20,
    },
    buttonsContainer: {
        flex: 1,
        borderColor: 'orange',
        alignItems: 'center',
    },
    loginButton: {
        width: 200,
        backgroundColor: 'transparent',
        borderWidth: 0.5,
        borderColor: colors.bgPrimary,
        marginBottom: 10,
    },
    signupButton: {
        width: 200,
        backgroundColor: 'transparent',
        borderWidth: 0.5,
        borderColor: colors.bgError
    },
    loginButtonText: {
        fontWeight: '300',
        color: 'white'
    },
    signupButtonText: {
        fontWeight: '300',
        color: 'white'
    }
});