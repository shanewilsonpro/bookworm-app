import React, { Component } from 'react';

import { createAppContainer, createSwitchNavigator, createStackNavigator, createDrawerNavigator, createBottomTabNavigator } from "react-navigation";

import WelcomeScreen from "./screens/AppSwitchNavigator/welcome-screen";
import HomeScreen from "./screens/home-screen";
import LoginScreen from "./screens/login-screen";
import SettingsScreen from "./screens/settings-screen";
import CustomDrawerComponent from "./screens/DrawerNavigator/custom-drawer-component";
import LoadingScreen from "./screens/AppSwitchNavigator/loading-screen";
import BooksReadScreen from "./screens/HomeTabNavigator/books-read-screen";
import BooksReadingScreen from "./screens/HomeTabNavigator/books-reading-screen";

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

const HomeTabNavigator = createBottomTabNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'Total Books'
    }
  },
  BooksReadingScreen: {
    screen: BooksReadingScreen,
    navigationOptions: {
      tabBarLabel: 'Books Reading'
    }
  },
  BooksReadScreen: {
    screen: BooksReadScreen,
    navigationOptions: {
      tabBarLabel: 'Books Read'
    }
  }
}, {
  tabBarOptions: {
    style: {
      backgroundColor: colors.bgMain
    },
    activeTintColor: colors.logoColor,
    inactiveTintColor: colors.bgTextInput
  }
});

HomeTabNavigator.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];

  switch (routeName) {
    case 'HomeScreen':
      return {
        headerTitle: 'Total Books'
      };
    case 'BooksReadingScreen':
      return {
        headerTitle: 'Books Reading'
      };
    case 'BooksReadScreen':
      return {
        headerTitle: 'Books Read'
      };
    default:
      return {
        headerTitle: 'Bookworm'
      };
  }
}

const HomeStackNavigator = createStackNavigator({
  HomeTabNavigator: {
    screen: HomeTabNavigator,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Ionicons
            name='ios-menu'
            size={30}
            color={colors.logoColor}
            onPress={() => navigation.openDrawer()}
            style={{ marginLeft: 10 }}
          />
        )
      }
    }
  }
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: colors.bgMain
    },
    headerTintColor: 'white'
  }
})

const AppDrawerNavigator = createDrawerNavigator({
  HomeStackNavigator: {
    screen: HomeStackNavigator,
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

