import { useEffect } from "react";

import { useDispatch } from "react-redux";

import firebase from "firebase/app";
import "firebase/auth";

export default function useAuthenticateUser() {
  const dispatch = useDispatch();

  useEffect(() => {
    let unsubscribe;
    try {
      unsubscribe = firebase.auth().onAuthStateChanged(user => {
        if (user) {
          //sign in the user
          dispatch({ type: "SIGN_IN", payload: user });
        } else {
          console.log("No user signed in");
          dispatch({ type: "SIGN_OUT" });
        }
        unsubscribe();
      });
    } catch (e) {
      //sign out user
      dispatch({ type: "SIGN_OUT" });
    }
  }, [dispatch]);
}