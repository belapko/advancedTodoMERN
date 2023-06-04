import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {updateUserInfo} from "../../features/auth/authAction";
import styles from "../../styles/menu.module.css";

const Profile = () => {
    const {userInfo} = useSelector((state) => state.auth);
    const [name, setName] = useState(userInfo.name);
    const [photo, setPhoto] = useState(typeof File);

    const dispatch = useDispatch();

    const formData = new FormData()
    formData.append('name', name);
    formData.append('phone', userInfo.phone_number)
    formData.append('photo', photo);

    const sendData = () => {
        dispatch(updateUserInfo({formData}));
    };


    return (
        <div className={styles.profileContainer}>
            <input className={styles.input} placeholder='Введите имя' value={name}
                   onChange={(event) => setName(event.target.value)}/>
            <div className={styles.file}>
                <img className={styles.img} src={`${userInfo.photo}?${new Date().getTime()}`} alt='profile'/>
                <input className={styles.fileInput} type='file' name='photo' accept='image/*'
                       onChange={(event) => setPhoto(event.target.files[0])}/>
            </div>
            <button className={styles.btn} onClick={sendData}>Сохранить</button>
        </div>
    );
};

export default Profile;