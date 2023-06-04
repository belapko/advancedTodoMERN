import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Theme from "../theme/Theme";
import styles from "../../styles/auth.module.css";
import {exist, login, register} from "./authAction";

const Auth = () => {
    const {isExist, error, success} = useSelector((state) => state.auth);
    const [variant, setVariant] = useState('auth');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [photo, setPhoto] = useState(typeof File);
    const [code, setCode] = useState('0000');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (success) navigate('/todos');
        if (error) setVariant('register');
    }, [error, success, navigate]);

    const formData = new FormData()
    const setFormData = () => {
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('photo', photo);
        formData.append('code', code);

    }
    let btn;
    if (variant === 'auth') {
        btn = 'Авторизация';
    } else if (variant === 'login') {
        btn = 'Войти';
    } else {
        btn = 'Создать аккаунт';

    }
    const sendData = () => {
        if (variant === 'auth') {
            setVariant('login');
        } else if (variant === 'login') {
            if (isExist) {
                dispatch(login({phone, code}));
            } else {
                dispatch(exist({phone}));
            }
        } else {
            setFormData();
            dispatch(register({formData}));
        }

    };


    return (
        <div className={styles.container}>
            <Theme path={'auth'}/>
            {
                variant === 'login' ?
                    <>
                        <label className={styles.label} htmlFor='phone'>+ 7</label>
                        <input id='phone' className={`${styles.input} ${styles.phone}`} type='tel'
                               placeholder='Номер телефона' value={phone}
                               maxLength={10} onChange={(event) =>
                            setPhone(event.target.value.replace(/[a-zA-Z\s]+/g, ''))}/>
                        {isExist ?
                            <input className={styles.input} type='text' placeholder='Код подтверждения' value={code}
                                   onChange={(event) => setCode(event.target.value)}/>
                            :
                            null
                        }
                    </>
                    : null
            }
            {
                variant === 'register' ?
                    <>
                        <label className={styles.label} htmlFor='phone'>+ 7</label>
                        <input id='phone' className={`${styles.input} ${styles.phone}`} type='tel'
                               placeholder='Номер телефона'
                               value={phone} onChange={(event) => setPhone(event.target.value)}/>
                        <input className={styles.input} type='text' placeholder='Имя пользователя' value={name}
                               onChange={(event) => setName(event.target.value)}/>
                        <input className={styles.input} type='file' name='photo' accept='image/*'
                               onChange={(event) => setPhoto(event.target.files[0])}/>
                        <input className={styles.input} type='text' placeholder='Код подтверждения' value={code}
                               onChange={(event) => setCode(event.target.value)}/>
                    </>
                    : null
            }
            <button className={styles.button} onClick={sendData}>{btn}</button>
        </div>
    );
};

export default Auth;
