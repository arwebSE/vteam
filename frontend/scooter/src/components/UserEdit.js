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
            className="w-11/12 m-1 p-5 bg-slate-300 rounded flex flex-col items-center justify-center gap-5"
        >
            <label className="text-lg font-bold">Username:</label>
            <input
                className="rounded ml-2 w-4/5 p-2 font-extralight"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <label className="text-lg font-bold">Email:</label>
            <input
                className="rounded w-4/5 ml-2 p-2 font-extralight"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <label className="text-lg font-bold">Password:</label>
            <input
                className="rounded ml-2 w-4/5 p-2 font-extralight"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <label className="text-lg font-bold">User Role:</label>
            <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="rounded ml-2 p-2 font-extralight"
            >
                <option value="admin">Admin</option>
                <option value="user">User</option>
            </select>

            <button
                className="w-20 rounded text-lg bg-black p-2 text-white"
                type="submit"
            >
                Save
            </button>
        </form>
    );
};

export default UserEdit;
