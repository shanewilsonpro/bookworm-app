import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, ActivityIndicator } from 'react-native';

import CustomActionButton from "../components/custom-action-button";

import colors from "../assets/colors";
import * as firebase from "firebase";
import 'firebase/auth';
import 'firebase/database'

class LoginScreen extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            isLoading: false
        }
    }

    onSignIn = async () => {
        if (this.state.email && this.state.password) {
            this.setState({ isLoading: true })
            try {
                const response = await firebase.auth().
                    signInWithEmailAndPassword(this.state.email, this.state.password);
                if (response) {
                    this.setState({ isLoading: false })
                    this.props.navigation.navigate('LoadingScreen')
                }
            } catch (error) {
                this.setState({ isLoading: false });
                switch (error.code) {
                    case 'auth/user-not-found':
                        alert('A user with that email does not exist. Try signing up.')
                        break;
                    case 'auth/invalid-email':
                        alert('Please enter an email address')
                }
            }
        }
        else {
            alert('PLease enter email and password.')
        }
    }

    onSignUp = async () => {
        if (this.state.email && this.state.password) {
            this.setState({ isLoading: true })
            try {
                const response = await firebase.auth().createUserWithEmailAndPassword(
                    this.state.email,
                    this.state.password
                );
                if (response) {
                    this.setState({ isLoading: false })

                    const user = await firebase.database().ref('users/').child(
                        response.user.uid).set({email:response.user.email, uid:response.user.uid});
                    this.props.navigation.navigate('LoadingScreen');
                    // this.onSignIn(this.state.email, this.state.password);
                }
            } catch (error) {
                this.setState({ isLoading: false })
                if (error.code == 'auth/email-already-in-use') {
                    alert('User already exists. Try login')
                }
            }
        } else {
            alert('Please enter email and password')
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.isLoading ?
                    <View style={[StyleSheet.absoluteFill, {
                        alignItems: 'center', justifyContent: 'center',
                        zIndex: 1000, elevation: 1000
                    }]}>
                        <ActivityIndicator size="large" color={colors.logoColor} />
                    </View>
                    : null}
                <View style={styles.containerStyle}>
                    <TextInput
                        style={styles.textInput}
                        placeholder='abc@example.com'
                        placeholderTextColor={colors.bgTextInputDark}
                        keyboardType='email-address'
                        onChangeText={email => this.setState({ email })}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder='Enter password'
                        placeholderTextColor={colors.bgTextInputDark}
                        secureTextEntry
                        onChangeText={password => this.setState({ password })}
                    />
                    <View style={styles.loginButtonsContainer}>
                        <CustomActionButton onPress={this.onSignIn} style={[styles.loginButtons, { borderColor: colors.bgPrimary }]}>
                            <Text style={styles.loginButtonText}>Login</Text>
                        </CustomActionButton>
                        <CustomActionButton onPress={this.onSignUp} style={[styles.loginButtons, { borderColor: colors.bgError }]}>
                            <Text style={styles.loginButtonText}>Sign Up</Text>
                        </CustomActionButton>
                    </View>
                </View>
            </View>
        )
    }
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgMain
    },
    containerStyle: {
        flex: 1,
        justifyContent: 'center'
    },
    textInput: {
        height: 50,
        borderWidth: 0.5,
        borderColor: colors.borderColor,
        marginHorizontal: 40,
        marginBottom: 10,
        color: 'white',
        paddingHorizontal: 10
    },
    loginButtonsContainer: {
        alignItems: 'center'
    },
    loginButtons: {
        borderWidth: 0.5,
        backgroundColor: 'transparent',
        marginTop: 10,
        width: 200,
    },
    loginButtonText: {
        color: 'white',
        fontWeight: '100'
    }
})


