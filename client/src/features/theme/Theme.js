import React, {useEffect} from 'react';
import {LuLightbulb, LuLightbulbOff} from "react-icons/lu";
import {useDispatch, useSelector} from "react-redux";
import {set} from "./themeSlice";
import styles from "../../styles/theme.module.css";

const Theme = ({path}) => {
    const theme = useSelector((state) => state.theme);
    const dispatch = useDispatch();

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        localStorage.setItem('theme', theme);
    }, [theme]);

    const handleChange = () => {
        const next = theme === 'dark' ? 'light' : 'dark';
        dispatch(set(next));
    }

    return (
        <div className={path === 'auth' ? `${styles.auth} ${styles.theme}` : `${styles.theme}`}>
            <span onClick={handleChange}>
                {theme === 'dark' ? <LuLightbulb size={30}/> : <LuLightbulbOff size={30}/>}
            </span>
        </div>
    );
};

export default Theme;