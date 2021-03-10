import React, { Component } from 'react';

import { createAppContainer, createSwitchNavigator, createStackNavigator, createDrawerNavigator } from "react-navigation";

import WelcomeScreen from "./screens/AppSwitchNavigator/welcome-screen";
import HomeScreen from "./screens/home-screen";
import LoginScreen from "./screens/login-screen";
import SettingsScreen from "./screens/settings-screen";
import CustomDrawerComponent from "./screens/DrawerNavigator/custom-drawer-component";
import LoadingScreen from "./screens/AppSwitchNavigator/loading-screen";

import { Ionicons } from "@expo/vector-icons";
import colors from './assets/colors';
import * as firebase from "firebase";
import { firebaseConfig } from "./config/config";

class App extends React.Component {
  constructor() {
    super();
    this.initializeFirebase();
  }

  initializeFirebase = () => {
    firebase.initializeApp(firebaseConfig);
  };
  
  render() {
    return <AppContainer />;
  }
}

const LoginStackNavigator = createStackNavigator({
  WelcomeScreen: {
    screen: WelcomeScreen,
    navigationOptions: {
      header: null
    }
  },
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {}
  }
}, {
  mode: 'modal',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: colors.bgMain
    }
  }
})

const AppDrawerNavigator = createDrawerNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Home',
      drawerIcon: () => <Ionicons name='ios-home' size={24} />
    }
  },
  SettingsScreen: {
    screen: SettingsScreen,
    navigationOptions: {
      title: 'Settings',
      drawerIcon: () => <Ionicons name='ios-settings' size={24} />
    }
  },
}, {
  contentComponent: CustomDrawerComponent
})

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen,
  LoginStackNavigator,
  AppDrawerNavigator
});

const AppContainer = createAppContainer(AppSwitchNavigator);

export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });
