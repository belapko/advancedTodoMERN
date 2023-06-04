import {createSlice} from "@reduxjs/toolkit";
import {create, read, update} from "./todosAction";


const initialState = {
    fetch: false,
    loading: false,
    error: null,
    success: false,
    todos: []
}

export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        changeFetch: (state) => {
            state.fetch = !state.fetch;
        }
    },
    extraReducers: (builder) => {
        // create todos
        builder.addCase(create.pending.type, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(create.fulfilled.type, (state, {payload}) => {
            state.loading = false;
            state.success = true;
        });
        builder.addCase(create.rejected.type, (state, {payload}) => {
            state.loading = false;
            state.error = payload;
        });

        // get todos
        builder.addCase(read.pending.type, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(read.fulfilled.type, (state, {payload}) => {
            state.loading = false;
            state.success = true;
            state.todos = payload;
        });
        builder.addCase(read.rejected.type, (state, {payload}) => {
            state.loading = false;
            state.error = payload;
        });

        //patch todos
        builder.addCase(update.pending.type, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(update.fulfilled.type, (state, {payload}) => {
            state.loading = false;
            state.success = true;
        });
        builder.addCase(update.rejected.type, (state, {payload}) => {
            state.loading = false;
            state.error = payload;
        });
    }
})

export const {changeFetch} = todoSlice.actions;
export default todoSlice.reducer;