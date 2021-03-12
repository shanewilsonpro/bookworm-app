import React from 'react';

import * as firebase from "firebase";
import { firebaseConfig } from "./config/config";

import { Provider } from "react-redux";
import store from "./redux/store";

import Bookworm from "./bookworm";

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

export default function App() {
  return (
    <Provider store={store}>
      <Bookworm />
    </Provider>
  );
}

