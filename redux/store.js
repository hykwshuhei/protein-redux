import { configureStore } from "@reduxjs/toolkit";
import chatSlice from "./chatSlice";
import counterSlice from "./counterSlice";

export const store = configureStore({
    reducer: {
        chatUserId: chatSlice,
        counter: counterSlice
    },
});
