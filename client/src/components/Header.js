import React, {useEffect, useRef, useState} from "react";
import AddTodo from "./AddTodo";
import {FaBars} from "react-icons/fa";
import Menu from "./menu/Menu";
import Theme from "../features/theme/Theme";
import {Outlet} from "react-router-dom";
import styles from "../styles/header.module.css";

const Header = () => {
    const [isVisibleMenu, setIsVisibleMenu] = useState(false);

    // При клике на любое место, кроме кнопок меню - скрываем меню
    const ref = useRef(null);
    const handleChangeVisible = (event) => {
        if (event.target.id === 'menu') return;
        if (typeof event.target.className === 'object' || (ref.current && !ref.current.contains(event.target) && !event.target.className.includes('menu'))) {
            setIsVisibleMenu(false);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleChangeVisible);
        return () => {
            document.removeEventListener('mousedown', handleChangeVisible);
        };
    });

    return (
        <>
            <div className={styles.container}>
                <header className={styles.header}>
                    <Theme />
                    <AddTodo/>
                    {isVisibleMenu ? <Menu/> : null}
                    <div className={styles.menu} ref={ref} onClick={() => setIsVisibleMenu(!isVisibleMenu)
                    }>
                        <FaBars id={'menu'} size={25}/>
                    </div>
                </header>
                <main>
                    <Outlet/>
                </main>
            </div>
        </>
    );
};
export default Header;