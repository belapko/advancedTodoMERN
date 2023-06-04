import React, {useState} from "react";
import {create} from "../features/todos/todosAction";
import {changeFetch} from "../features/todos/todosSlice";
import {useDispatch} from "react-redux";
import styles from "../styles/todos.module.css";


const AddTodo = () => {
    const dispatch = useDispatch();
    const [text, setText] = useState('');

    const createTodo = async () => {
        if (text.length > 0 && text.trim().length > 0) {
            setText('');
            await dispatch(create({text}));
            dispatch(changeFetch());
        }
    }

    return (
        <div >
            <input className={styles.input} value={text} placeholder='Что добавить в список?'
                   onChange={e => setText(e.target.value)}/>
            <button className={styles.btnAdd} onClick={createTodo}>Добавить</button>
        </div>
    );
};

export default AddTodo;