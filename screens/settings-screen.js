import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import CustomActionButton from "../components/custom-action-button";
import colors from "../assets/colors";

class SettingsScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <CustomActionButton
                    style={styles.signupButton}
                    title="Log Out"
                    onPress={() => this.props.navigation.navigate('WelcomeScreen')}>
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

