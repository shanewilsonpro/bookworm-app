import React from 'react';
import { LogBox } from 'react-native';

import * as firebase from "firebase";
import { firebaseConfig } from "./config/config";

import { Provider } from "react-redux";
import store from "./redux/store";

import Bookworm from "./bookworm";

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

LogBox.ignoreAllLogs();

export default function App() {
  return (
    <Provider store={store}>
      <Bookworm />
    </Provider>
  );
}

