import {createAsyncThunk} from "@reduxjs/toolkit";
import {API} from "../requests";


export const register = createAsyncThunk(
    'auth/register',
    async ({formData}, {rejectWithValue}) => {
        try {
            const user = await API.post('/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return user.data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
)

export const exist = createAsyncThunk(
    'auth/exist',
    async ({phone}, {rejectWithValue}) => {
        try {
            await API.post('/exist', {phone}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
)

export const login = createAsyncThunk(
    'auth/login',
    async ({phone, code}, {rejectWithValue}) => {
        try {
            const user = await API.post('/login', {phone, code}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return user.data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
)

export const getUserInfo = createAsyncThunk(
    'auth/getUserInfo',
    async (_, {rejectWithValue}) => {
        try {
            const user = await API.get('/me');
            return user.data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
)

export const updateUserInfo = createAsyncThunk(
    'auth/updateUserInfo',
    async ({formData}, {rejectWithValue}) => {
        try {
            const user = await API.patch('/me', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return user.data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
)
