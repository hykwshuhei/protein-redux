import { configureStore } from "@reduxjs/toolkit";
import chatSlice from "./chatSlice";
import counterSlice from "./counterSlice";
import userIdSlice from "./userIdSlice";

export const store = configureStore({
    reducer: {
        chatUserId: chatSlice,
        counter: counterSlice,
        userId: userIdSlice
    },
});
