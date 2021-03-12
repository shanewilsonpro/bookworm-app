import React from "react";
import { StyleSheet } from "react-native";

import WelcomeScreen from "./screens/AppSwitchNavigator/welcome-screen";
import HomeScreen from "./screens/home-screen";
import LoginScreen from "./screens/login-screen";
import SettingsScreen from "./screens/settings-screen";
import CustomDrawerComponent from "./screens/DrawerNavigator/custom-drawer-component";
import BooksReadingScreen from "./screens/HomeTabNavigator/books-reading-screen";
import BooksReadScreen from "./screens/HomeTabNavigator/books-read-screen";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import colors from "./assets/colors";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import "firebase/auth";
import { useSelector } from "react-redux";
import SplashScreen from "./screens/splash-screen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import BooksCountContainer from "./redux/containers/books-count-container";
import { Ionicons } from "@expo/vector-icons";
import useAuthenticateUser from "./hooks/use-authenticate-user";


export default function BookWormHooks() {
    useAuthenticateUser();
  
    const auth = useSelector(state => state.auth);

    if (auth.isLoading) {
      return <SplashScreen />;
    }
    return (
      <NavigationContainer>
        {!auth.isSignedIn ? (
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: colors.bgMain
              },
              headerTintColor: "white"
            }}
          >
            <Stack.Screen
              name="WelcomeScreen"
              component={WelcomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{ headerBackTitleVisible: false }}
            />
          </Stack.Navigator>
        ) : (
          <ActionSheetProvider>
            <AppDrawerNavigator />
          </ActionSheetProvider>
        )}
      </NavigationContainer>
    );
  }
  
  const HomeTabNavigator = () => (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          backgroundColor: colors.bgMain
        },
        activeTintColor: colors.logoColor,
        inactiveTintColor: colors.bgTextInput
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          switch (route.name) {
            case "Books":
              return <BooksCountContainer color={color} type="books" />;
            case "BooksReading":
              return <BooksCountContainer color={color} type="booksReading" />;
            case "BooksRead":
              return <BooksCountContainer color={color} type="booksRead" />;
          }
        }
      })}
    >
      <Tab.Screen name="Books" component={HomeScreen} />
      <Tab.Screen
        options={{ tabBarLabel: "Books Reading" }}
        name="BooksReading"
        component={BooksReadingScreen}
      />
      <Tab.Screen
        options={{ tabBarLabel: "Books Read" }}
        name="BooksRead"
        component={BooksReadScreen}
      />
    </Tab.Navigator>
  );
  
  const getHeaderTitle = route => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : "Home";
  
    switch (routeName) {
      case "Home":
        return "Books";
      case "BooksReading":
        return "Books Reading";
      case "BooksRead":
        return "Books Read";
    }
  };
  
  const HomeStackNavigator = ({ navigation }) => (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.bgMain },
        headerTintColor: "white",
        headerLeft: () => (
          <Ionicons
            onPress={() => navigation.openDrawer()}
            name="ios-menu"
            size={30}
            color="white"
            style={{ marginLeft: 10 }}
          />
        )
      }}
    >
      <Stack.Screen
        options={({ route }) => ({
          title: getHeaderTitle(route)
        })}
        name="Books"
        component={HomeTabNavigator}
      />
    </Stack.Navigator>
  );
  
  const AppDrawerNavigator = ({ navigation }) => (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerComponent {...props} />}
    >
      <Drawer.Screen
        options={{ drawerIcon: () => <Ionicons name="ios-home" size={24} /> }}
        name="Home"
        component={HomeStackNavigator}
      />
      <Drawer.Screen
        options={{ drawerIcon: () => <Ionicons name="ios-settings" size={24} /> }}
        name="Settings"
        component={SettingsScreen}
      />
    </Drawer.Navigator>
  );
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    }
  });