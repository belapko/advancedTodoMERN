import {createAsyncThunk} from "@reduxjs/toolkit";
import {API} from "../requests";

export const create = createAsyncThunk(
    'todos/create',
    async ({text}, {rejectWithValue}) => {
        try {
            await API.post('/todos/create', {text});
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
)

export const read = createAsyncThunk(
    'todos/read',
    async (_, {rejectWithValue}) => {
        try {
            const todos = await API.get('/todos/read');
            return todos.data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
)

export const update = createAsyncThunk(
    'todos/update',
    async ({id, text, hide, complete}, {rejectWithValue}) => {
        try {
            if (text) {
                await API.patch(`/todos/update-data/${id}`, {text});
            }
            if (hide) {
                await API.patch(`/todos/update-hidden/${id}`);
            }
            if (complete) {
                await API.patch(`/todos/update-completed/${id}`);
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
)