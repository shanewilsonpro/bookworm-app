import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, ActivityIndicator } from 'react-native';

import CustomActionButton from "../components/custom-action-button";

import colors from "../assets/colors";
import * as firebase from "firebase";
import 'firebase/auth';
import 'firebase/database';
import { useDispatch } from "react-redux";

export default function LoginScreenHooks() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const onSignIn = async () => {
        if (email && password) {
            setIsLoading(true);
            try {
                const response = await firebase
                    .auth()
                    .signInWithEmailAndPassword(email, password);
                if (response) {
                    setIsLoading(false);
                    dispatch({ type: "SIGN_IN", payload: response.user });
                }
            } catch (error) {
                setIsLoading(false);
                switch (error.code) {
                    case "auth/user-not-found":
                        alert("A user with that email does not exist. Try signing Up");
                        break;
                    case "auth/invalid-email":
                        alert("Please enter an email address");
                        break;
                    default:
                        alert(error.code);
                }
            }
        }
    };

    const onSignUp = async () => {
        if (email && password) {
            setIsLoading(true);
            try {
                const response = await firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password);
                if (response) {
                    setIsLoading(false);
                    const user = await firebase
                        .database()
                        .ref("users")
                        .child(response.user.uid)
                        .set({ email: response.user.email, uid: response.user.uid });
                    dispatch({ type: "SIGN_IN", payload: response.user });
                    //automatically signs in the user
                }
            } catch (error) {
                setIsLoading(false);
                if (error.code == "auth/email-already-in-use") {
                    alert("User already exists.Try loggin in");
                }
                console.log(error);
            }
        } else {
            alert("Please enter email and password");
        }
    };
    return (
        <View style={styles.container}>
            {isLoading ? (
                <View
                    style={[
                        StyleSheet.absoluteFill,
                        {
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 1000,
                            elevation: 1000
                        }
                    ]}
                >
                    <ActivityIndicator size="large" color={colors.logoColor} />
                </View>
            ) : null}
            <View style={{ flex: 1, justifyContent: "center" }}>
                <TextInput
                    style={styles.textInput}
                    placeholder={"abc@example.com"}
                    placeholderTextColor={colors.bgTextInputDark}
                    keyboardType="email-address"
                    onChangeText={email => setEmail(email)}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="enter password"
                    placeholderTextColor={colors.bgTextInputDark}
                    secureTextEntry
                    onChangeText={password => setPassword(password)}
                />
                <View style={{ alignItems: "center" }}>
                    <CustomActionButton
                        onPress={onSignIn}
                        style={[styles.loginButtons, { borderColor: colors.bgPrimary }]}
                    >
                        <Text style={{ color: "white" }}>Login</Text>
                    </CustomActionButton>
                    <CustomActionButton
                        onPress={onSignUp}
                        style={[styles.loginButtons, { borderColor: colors.bgError }]}
                    >
                        <Text style={{ color: "white" }}>Sign Up</Text>
                    </CustomActionButton>
                </View>
            </View>
            <View style={{ flex: 1 }}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgMain
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
    loginButtons: {
        borderWidth: 0.5,
        backgroundColor: "transparent",
        marginTop: 10,
        width: 200
    }
});


