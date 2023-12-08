import React, { useState, useEffect } from "react";
import userModel from "../models/userModel.js";
import { useNavigate } from "react-router-dom";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            const fetchedUsers = await userModel.getUsers();
            setUsers(fetchedUsers);
        };

        fetchUsers();
    }, []);

    const clickHandler = (userid) => {
        navigate(`/admin/user/${userid}`);
    };

    return (
        <div className="flex flex-col p-6 bg-gray-100 rounded-lg shadow-md">
            <div className="flex flex-row justify-between text-lg mb-4">
                <h1 className="font-bold text-gray-700">Users</h1>
                <h1 className="font-bold text-gray-700">ID</h1>
            </div>

            <div className="flex flex-col gap-2">
                {users.map((user) => (
                    <div
                        key={user.id}
                        onClick={() => clickHandler(user.userId)}
                        className="cursor-pointer rounded-lg hover:bg-slate-200 flex flex-row bg-white justify-between items-center p-4 shadow-sm transition hover:shadow-md transition duration-300 ease-in-out"
                    >
                        <div className="flex flex-col">
                            <h2 className="text-lg font-semibold text-gray-800">
                                {user.username}
                            </h2>
                            <p className="text-gray-600">{user.email}</p>
                        </div>
                        <h1 className="text-lg font-semibold text-gray-800">
                            {user.userId}
                        </h1>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserList;
