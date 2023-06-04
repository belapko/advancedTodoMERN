import {createAsyncThunk} from "@reduxjs/toolkit";
import {API} from "../requests";

export const readUsers = createAsyncThunk(
    'users/read',
    async (_, {rejectWithValue}) => {
        try {
            const users = await API.get('/users');
            return users.data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
)
