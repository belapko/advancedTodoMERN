import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {set} from "../../features/theme/themeSlice";
import styles from "../../styles/menu.module.css";

const Settings = () => {
    const theme = useSelector((state) => state.theme), dispatch = useDispatch();
    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        localStorage.setItem('theme', theme);
    }, [theme]);

    const handleChange = () => {
        const next = theme === 'dark' ? 'light' : 'dark';
        dispatch(set(next));
    }

    return (
        <>
            <div className={styles.btnContainer}>
                <button className={styles.btn} onClick={handleChange}>Изменить тему оформления</button>
                <button className={styles.btn}>Изменить язык</button>
            </div>
            <p className={styles.text}>Сделал Степан Белапко как тестовое задание в NBS wt 04.06.2023</p>
        </>
    );
};

export default Settings;