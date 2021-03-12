import React from "react";
import { View, Text, StyleSheet } from "react-native";

import CustomActionButton from "../components/custom-action-button";
import colors from "../assets/colors";
import * as firebase from "firebase";
import "firebase/auth";
import { useDispatch } from "react-redux";

import { signOut } from "../redux/actions";

export default function SettingsScreen() {
    const dispatch = useDispatch();

    const handleSignOut = async () => {
        try {
            await firebase.auth().signOut();
            dispatch(signOut());
        } catch (error) {
            alert("Unable to sign out right now");
        }
    };

    return (
        <View style={styles.container}>
            <CustomActionButton
                style={{
                    width: 200,
                    backgroundColor: "transparent",
                    borderWidth: 0.5,
                    borderColor: colors.bgError
                }}
                title="Sign Up"
                onPress={handleSignOut}
            >
                <Text style={{ fontWeight: "100", color: "white" }}>Logout</Text>
            </CustomActionButton>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.bgMain
    }
});

