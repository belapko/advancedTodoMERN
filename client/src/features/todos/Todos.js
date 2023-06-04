import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {read} from "./todosAction";
import Todo from "../../components/Todo";
import {getUserInfo} from "../auth/authAction";
import styles from "../../styles/todos.module.css";


const Todos = ({hiddenTodo = false}) => {
    const {fetch, todos} = useSelector((state) => state.todos);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserInfo());
        dispatch(read());
    }, [dispatch, fetch])

    return (
        <div>
            <ul className={styles.todos}>
                {hiddenTodo ? todos.filter((todo) => todo.hidden).map((todo) =>
                        <li className={styles.todo} key={todo.id}>
                            <Todo inMenu={true} todo={todo}/>
                        </li>)
                    :
                    todos.filter((todo) => !todo.hidden).map((todo) =>
                        <li className={styles.todo} key={todo.id}>
                            <Todo todo={todo}/>
                        </li>
                    )}
            </ul>
        </div>
    );
};

export default Todos;