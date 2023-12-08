import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

import userModel from "../models/userModel";

const UserEdit = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const userId = location.pathname.split("/").pop();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await userModel.getUser(userId);
                setUsername(user.username);
                setEmail(user.email);
                setPassword(user.passwd);
                setRole(user.userrole || "user");
            } catch (error) {
                console.error("Failed to fetch user:", error);
                // todo: handle fetch error?
            }
        };

        fetchUser();
    }, [userId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await userModel.editUser(userId, username, email, password, role);
            console.log("User updated successfully.");
            navigate("/admin/user");
        } catch (error) {
            console.error("Failed to update user:", error);
            // todo: handle submit error?
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col bg-gray-100 rounded-lg shadow-xl p-12"
        >
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Edit User
            </h1>

            <label className="text-lg font-semibold mb-2">Username:</label>
            <input
                className="rounded p-3 mb-4 shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <label className="text-lg font-semibold mb-2">Email:</label>
            <input
                className="rounded p-3 mb-4 shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <label className="text-lg font-semibold mb-2">Password:</label>
            <input
                className="rounded p-3 mb-4 shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <label className="text-lg font-semibold mb-2">User Role:</label>
            <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="rounded p-3 mb-6 shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            >
                <option value="admin">Admin</option>
                <option value="user">User</option>
            </select>

            <button
                className="w-full rounded bg-indigo-600 hover:bg-indigo-700 text-white text-lg p-3 shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
                type="submit"
            >
                Save
            </button>
        </form>
    );
};

export default UserEdit;
