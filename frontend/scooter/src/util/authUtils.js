import { useState, } from 'react';
import userModel from '../models/userModel';

export const useLogin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);



    const handleLogin = async(username, passwd) => {
        const passdata = await userModel.passVerif(username, passwd);

        if (passdata) {
            setIsLoggedIn(true);
            localStorage.setItem('isLoggedIn', 'true'); // save login state
            localStorage.setItem('userName', username);
            localStorage.setItem('userId', passdata.userId);
        } else {
            alert("Wrong username or password");
        }
    };

    const handleOauthlogin = async(state) => {
        if (state) {
            setIsLoggedIn(true);
            localStorage.setItem('isLoggedIn', 'true'); // save login state
        } else {
            alert("Wrong username or password");
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn'); // clear login state
        localStorage.removeItem('userName');
        localStorage.removeItem('userId');
    };

    return { handleLogin, handleOauthlogin, handleLogout };
};