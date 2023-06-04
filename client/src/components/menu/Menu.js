import React, {useState} from 'react';
import Settings from "./Settings";
import Profile from "./Profile";
import Users from "./Users";
import styles from "../../styles/menu.module.css";
import Todos from "../../features/todos/Todos";


const Menu = () => {
    const [showMenuItem, setShowMenuItem] = useState(null)

    const logoutUser = () => {
        localStorage.removeItem('uid');
        localStorage.removeItem('token');
        window.location.replace('/auth');
    }

    return (
        <div className={styles.container}>
            <div>
                <button className={styles.btn}
                        onClick={() => setShowMenuItem(showMenuItem === 'todos' ? null : 'todos')}>Скрытые
                </button>
                <button className={styles.btn}
                        onClick={() => setShowMenuItem(showMenuItem === 'settings' ? null : 'settings')}>Настройки
                </button>
                <button className={styles.btn}
                        onClick={() => setShowMenuItem(showMenuItem === 'profile' ? null : 'profile')}>Профиль
                </button>
                <button className={styles.btn}
                        onClick={() => setShowMenuItem(showMenuItem === 'users' ? null : 'users')}>Пользователи
                </button>
                <button className={styles.btn} onClick={logoutUser}>Выход</button>
            </div>
            {showMenuItem ?
            <div className={styles.item}>
                {showMenuItem === 'todos' ? <Todos hiddenTodo={true}/> : null }
                {showMenuItem === 'settings' ? <Settings/> : null}
                {showMenuItem === 'profile' ? <Profile/> : null}
                {showMenuItem === 'users' ? <Users/> : null}
            </div>
                : null}
        </div>
    );
};

export default Menu;