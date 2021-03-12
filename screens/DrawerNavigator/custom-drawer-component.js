import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Platform } from 'react-native';
import colors from "../../assets/colors";
import { Ionicons } from "@expo/vector-icons";

import { DrawerItemList } from "@react-navigation/drawer";

class CustomDrawerComponent extends Component {
    render() {
        return (
           <ScrollView>
               <SafeAreaView style={styles.container} />
               <View style={styles.logoContainer}>
                   <Ionicons name="ios-bookmarks" size={100} color={colors.logoColor} />
                   <Text style={styles.iconText}>Bookworm</Text>
               </View>
               <DrawerItemList {...this.props} />
           </ScrollView>
        )
    }
}

export default CustomDrawerComponent;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.bgMain,
    },
    logoContainer: {
        height: 160,
        backgroundColor: colors.bgMain,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop:Platform.OS == 'android' ? 20 : 0,
    },
    iconText: {
        fontSize: 25,
        fontWeight: '100',
        color: 'white',
        marginTop: 5
    },
});