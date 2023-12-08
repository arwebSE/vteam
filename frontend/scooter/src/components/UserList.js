import React, { useEffect, useState } from "react";
import userModel from "../models/userModel.js";
import { useNavigate } from "react-router-dom";

const UserList = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            const usersData = await userModel.getUsers();
            setUsers(usersData);
        }
        fetchUsers();
    }, []);

    function clickHandler(userId) {
        navigate(`/admin/user/${userId}`);
    }

    return (
        <div className="flex flex-col">
            <table className="min-w-full">
                <thead>
                    <tr className="bg-indigo-600 text-white">
                        <th className="py-2 px-4 text-left">Username</th>
                        <th className="py-2 px-4 text-left">Email</th>
                        <th className="py-2 px-4 text-right">UserID</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr
                            key={user.userId}
                            onClick={() => clickHandler(user.userId)}
                            className="cursor-pointer hover:bg-indigo-100"
                        >
                            <td className="py-2 px-4">{user.username}</td>
                            <td className="py-2 px-4">{user.email}</td>
                            <td className="py-2 px-4 text-right">
                                {user.userId}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
