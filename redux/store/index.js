import { createStore, combineReducers } from "redux";

import booksReducer from "../reducers/books-reducer";
import authReducer from "../reducers/auth-reducer";

const store = createStore(
    combineReducers({
        books: booksReducer,
        auth: authReducer
    })
);

export default store;