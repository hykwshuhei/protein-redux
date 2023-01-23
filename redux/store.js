import { configureStore } from "@reduxjs/toolkit";
import chatSlice from "./chatSlice";
import counterSlice from "./counterSlice";
import userIdSlice from "./userIdSlice";
import itemsSlice from "./itemsSlice";
// import storageSession from "redux-persist/lib/storage";
import sessionStorage from 'redux-persist/lib/storage/session'
// import { AsyncStorage } from 'react-native'
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';


const persistConfig = {
    key: "root",
    storage: sessionStorage,
}

const persistedReducer = persistReducer(persistConfig, userIdSlice)
const persistedItemsReducer = persistReducer(persistConfig, itemsSlice)

export const store = configureStore({
    reducer: {
        persistedReducer,
        persistedItemsReducer,
        chatUserId: chatSlice,
        counter: counterSlice,
        userId: userIdSlice,
        items: itemsSlice
    },
    middleware: [thunk]
});

export const persistor = persistStore(store);
