import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {readUsers} from "../../features/users/usersAction";
import styles from "../../styles/menu.module.css";

const Users = () => {
    const {users} = useSelector((state) => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(readUsers());
    }, [dispatch])

    return (
        <div>
            {users.map(user => (
                <div key={user.id}>
                <p className={styles.text}>Пользователь: {user.name}</p>
                    <img className={styles.img} src={user.photo} alt='profile'/>
                </div>
            ))}
        </div>
    );
};

export default Users;