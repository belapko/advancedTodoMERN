import React, {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {update} from "../features/todos/todosAction";
import {changeFetch} from "../features/todos/todosSlice";
import styles from "../styles/todos.module.css";
import {AiOutlineCheckCircle, AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import {BsCircle} from "react-icons/bs";

const Todo = ({inMenu = false, todo}) => {
    const dispatch = useDispatch();
    const [text, setText] = useState(todo.text);
    const [isEditing, setIsEditing] = useState(false);

    const ref = useRef(null); // При клике в любое место оменяем редактирование
    const handleChangeTodo = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setTimeout(() => {
                setIsEditing(false);
                setText(todo.text);
            }, 200)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleChangeTodo);
        return () => {
            document.removeEventListener('mousedown', handleChangeTodo);
        };
    });

    const saveTodo = async (id) => {
        await dispatch(update({id, text}));
        dispatch(changeFetch());
    }

    const hideTodo = async (id) => {
        await dispatch(update({id, hide: true}));
        dispatch(changeFetch());
    }

    const completeTodo = async (id) => {
        await dispatch(update({id, complete: true}));
        dispatch(changeFetch());
    }

    let textView;
    if (isEditing) {
        textView = (<input id={inMenu ? 'menu' : null} className={styles.input} ref={ref} value={text}
                           onChange={(event) => setText(event.target.value)}/>)
    } else {
        textView = (<p id={inMenu ? 'menu' : null} className={styles.text} onClick={() => setIsEditing(true)}>{todo.text}</p>)
    }

    return (
        <>
            <p id={inMenu ? 'menu' : null} className={styles.time}>{todo.created_at.split('T')[1].slice(0, 5)}</p>
            <button id={inMenu ? 'menu' : null} className={styles.icon} onClick={() =>
                hideTodo(todo.id)}>{inMenu ? <AiOutlineEye id='menu' size={25} /> : <AiOutlineEyeInvisible size={25}/>}</button>
            <button id={inMenu ? 'menu' : null} className={styles.icon} onClick={() =>
                completeTodo(todo.id)}>{todo.completed ? <AiOutlineCheckCircle id={inMenu ? 'menu' : null} size={27}/>
                : <BsCircle id={inMenu ? 'menu' : null} size={25}/>}</button>
            {textView}
            <button id={inMenu ? 'menu' : null} className={styles.btnSave} onClick={() =>
                isEditing ? saveTodo(todo.id) : setIsEditing(true)}>{isEditing ? 'Сохранить' : 'Изменить'}</button>
        </>
    );
};

export default Todo;