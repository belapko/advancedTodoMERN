import React from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Auth from "./features/auth/Auth";
import Todos from "./features/todos/Todos";
import Header from "./components/Header";


const App = () => {
    const isAuth = localStorage.getItem('uid') && localStorage.getItem('token');

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/todos' element={<Header/>}>
                    <Route path='/todos' element={<Todos/>}/>
                </Route>
                <Route index path='/auth' element={isAuth ? <Navigate to='/todos' replace={true}/> : <Auth/>}/>
                <Route path='*' element={isAuth ? <Navigate to='/todos' replace={true}/> :
                    <Navigate to='/auth' replace={true}/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;