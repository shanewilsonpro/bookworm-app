import { createStore, combineReducers } from "redux";

import booksReducer from "../reducers/books-reducer";

const store = createStore(
    combineReducers({
        books: booksReducer
    })
);

export default store;