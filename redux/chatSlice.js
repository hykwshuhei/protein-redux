import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
    name: "chatUserId",
    initialState: {
        id: 0,
    },
    reducers: {
        setId: (state, action) => {
            state.id = action.payload;
        }
    }
});

export const { setId } = chatSlice.actions;
export default chatSlice.reducer;
