import React, { useState, useEffect } from "react";
import userModel from "../models/userModel.js";
import { useNavigate } from "react-router-dom";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();

    const fetchUsers = async () => {
        const fetchedUsers = await userModel.getUsers();
        setUsers(fetchedUsers);
        setRefresh(false);
    };

    useEffect(() => {
        fetchUsers();
    }, [refresh]);

    const clickHandler = (userid) => {
        navigate(`/admin/user/${userid}`);
    };

    return (
        <div className="flex flex-col p-6 bg-gray-100 rounded-lg shadow-md">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-indigo-600 mb-6 text-center">
                Edit Users
            </h1>

            <div className="flex flex-row justify-between text-lg mb-4">
                <h1 className="font-bold text-gray-700">Users</h1>
                <h1 className="font-bold text-gray-700">ID</h1>
            </div>

            <div className="flex flex-col gap-2">
                {users.map((user) => (
                    <div
                        key={user.userId}
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
