import {createSlice} from "@reduxjs/toolkit";
import {exist, getUserInfo, login, register, updateUserInfo} from "./authAction";

const initialState = {
    fetch: false,
    isExist: false,
    error: null,
    success: false,
    userInfo: {
        name: '',
        photo: ''
    },
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(register.pending.type, (state) => {
            state.error = null;
        });
        builder.addCase(register.fulfilled.type, (state, {payload}) => {
            state.success = true;
            state.userInfo = payload;
            localStorage.setItem('uid', payload.id);
            localStorage.setItem('token', payload.token);
        });
        builder.addCase(register.rejected.type, (state, {payload}) => {
            state.error = payload;
        });

        builder.addCase(exist.pending.type, (state) => {
            state.error = null;
        });
        builder.addCase(exist.fulfilled.type, (state, {payload}) => {
            state.isExist = true;
        });
        builder.addCase(exist.rejected.type, (state, {payload}) => {
            state.error = payload;
            state.isExist = false;
        });

        builder.addCase(login.pending.type, (state) => {
            state.error = null;
        });
        builder.addCase(login.fulfilled.type, (state, {payload}) => {
            state.success = true;
            state.userInfo = payload;
            localStorage.setItem('uid', payload.id);
            localStorage.setItem('token', payload.token);
        });
        builder.addCase(login.rejected.type, (state, {payload}) => {
            state.error = payload;
        });

        builder.addCase(getUserInfo.pending.type, (state) => {
            state.error = null;
            state.userInfo.photo = '';
        });
        builder.addCase(getUserInfo.fulfilled.type, (state, {payload}) => {
            state.success = true;
            state.userInfo = payload;
        });
        builder.addCase(getUserInfo.rejected.type, (state, {payload}) => {
            state.error = payload;
        });

        builder.addCase(updateUserInfo.pending.type, (state) => {
            state.error = null;
            state.userInfo.photo = '';
        });
        builder.addCase(updateUserInfo.fulfilled.type, (state, {payload}) => {
            state.success = true;
            state.userInfo = payload;
        });
        builder.addCase(updateUserInfo.rejected.type, (state, {payload}) => {
            state.error = payload;
        });
    }
});

export default authSlice.reducer;