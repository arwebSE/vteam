import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import userModel from "../models/userModel";

const UserEdit = () => {

    const location = useLocation();
    const lastPartOfUrl = location.pathname.split("/").pop();

    useEffect(() => {
        const fetchUser = async () => {
            let users = await userModel.getUser(lastPartOfUrl);
            setName(users.username);
            setEmail(users.email);
            setPasswd(users.passwd);

            if (users.userrole === null || users.userrole === "user") {
                document.getElementById("select").selectedIndex = 1;
            }
            else {
                document.getElementById("select").selectedIndex = 0;
            }
        };

        fetchUser();
    }, [lastPartOfUrl]);
    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    const [passwd, setPasswd] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswdChange = (event) => {
        setPasswd(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        let selectedOption = document.getElementById("select").value;
        await userModel.editUser(lastPartOfUrl, username, email, passwd, selectedOption);

        console.log("User updated successfully.")
        // Fetch the updated user data
        const updatedUser = await userModel.getUser(lastPartOfUrl);
        // Update the state variables with the new data
        setName(updatedUser.username);
        setEmail(updatedUser.email);
        setPasswd(updatedUser.passwd);
    };

    return (
        <form className='w-11/12 m-1 p-5 bg-slate-300 rounded flex flex-col items-center justify-center gap-5' onSubmit={handleSubmit}>
            <label className='text-lg font-bold'>
                Username:
            </label>
            <input className='rounded ml-2 w-4/5 p-2 font-extralight' type="text" value={username} onChange={handleNameChange} />
            <label className='text-lg font-bold'>
                Email:
            </label>
            <input className='rounded w-4/5 ml-2 p-2 font-extralight' type="email" value={email} onChange={handleEmailChange} />
            <label className='text-lg font-bold'>
                Password:
            </label>
            <input className='rounded ml-2 w-4/5 p-2 font-extralight' type="password" value={passwd} onChange={handlePasswdChange} />
            <label className='text-lg font-bold'>
                User Role:
            </label>
            <select id="select" className='rounded ml-2 p-2 font-extralight'>
                <option value="admin">Admin</option>
                <option value="user">User</option>
            </select>
            <button className='w-20 rounded text-lg bg-black p-2 text-white' type="submit">Save</button>
        </form>
    );
};

export default UserEdit;
