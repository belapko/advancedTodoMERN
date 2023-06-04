import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import todoReducer from "../features/todos/todosSlice";
import usersReducer from "../features/users/usersSlice";
import themeReducer from "../features/theme/themeSlice";

export default configureStore({
    reducer: {
        auth: authReducer,
        todos: todoReducer,
        users: usersReducer,
        theme: themeReducer
    }
});