import {createSlice} from "@reduxjs/toolkit";
import {readUsers} from "./usersAction";


const initialState = {
    users: []
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(readUsers.fulfilled.type, (state, {payload}) => {
            state.users = payload;
        });
    }
})

export default usersSlice.reducer;