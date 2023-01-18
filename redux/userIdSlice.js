import { createSlice } from "@reduxjs/toolkit";

export const userIdSlice = createSlice({
    name: "userId",
    initialState: {
        id: 0,
    },
    reducers: {
        catchId: (state, action) => {
            state.id = action.payload;
        }
    }
});

export const { catchId } = userIdSlice.actions;
export default userIdSlice.reducer;
