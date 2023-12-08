import React from 'react';
import userModel from '../models/userModel.js';
import { useNavigate } from "react-router-dom";

let users = await userModel.getUsers();


const UserList = () => {
    const navigate = useNavigate();

    function clickHandler(userid) {
        navigate(`/admin/user/${userid}`);
    }

    return (
        <div className='flex flex-col'>

            <div className='flex flex-row justify-between text-lg'>
                <h1>Users</h1>
                <h1>ID</h1>
            </div>

            <div className='flex flex-col gap-1'>
                {users.map(user => (
                    <div onClick={() => clickHandler(user.userId)} className='cursor-pointer rounded hover:bg-slate-100 flex flex-row bg-slate-200 justify-between items-center pr-6'>
                        <div key={user.id} className='flex flex-col margin-1 h-fit p-1'>
                            <h2 className='text-lg font-semibold' >{user.username}</h2>
                            <p>{user.email}</p>
                        </div>
                        <h1 className='text-lg font-semibold'>{user.userId}</h1>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default UserList;
