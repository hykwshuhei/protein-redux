import { createSlice } from "@reduxjs/toolkit";

export const itemsSlice = createSlice({
    name: "items",
    initialState: {
        items: [],
    },
    reducers: {
        // catchItem: (state, action) => {
        catchItem(state, action) {
            const obj = action.payload
            state.items.push(obj)
        },
        deliteItem(state, action) {
            const actionId = action.payload.itemId
            const array = state.items.filter((item) => item.itemId !== actionId);
            state.items = array;
        }
    }
});

export const { catchItem, deliteItem } = itemsSlice.actions;
export default itemsSlice.reducer;
