import { configureStore } from "@reduxjs/toolkit";
import chatSlice from "./chatSlice";
import counterSlice from "./counterSlice";
import userIdSlice from "./userIdSlice";
// import storageSession from "redux-persist/lib/storage";
import sessionStorage from 'redux-persist/lib/storage/session'
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';


const persistConfig = {
    key: "root",
    storage: sessionStorage
}

const persistedReducer = persistReducer(persistConfig, userIdSlice)

export const store = configureStore({
    reducer: {
        persistedReducer,
        chatUserId: chatSlice,
        counter: counterSlice,
        userId: userIdSlice
    },
    middleware: [thunk]
});

export const persistor = persistStore(store)
