import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { SpinnerDotted } from "spinners-react";

import userModel from "../models/userModel";

const UserEdit = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");

    const userId = location.pathname.split("/").pop();

    const fetchUser = async () => {
        setLoading(true);
        try {
            const user = await userModel.getUser(userId);
            setUsername(user.username);
            setEmail(user.email);
            setPassword(user.passwd);
            setRole(user.userrole || "user");
        } catch (error) {
            console.error("Failed to fetch user:", error);
            // todo: handle fetch error?
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();

        return () => {
            // component unmount cleanup
            setUsername("");
            setEmail("");
            setPassword("");
            setRole("user");
        };
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

    const handleBack = () => {
        navigate("/admin/user");
    };

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <SpinnerDotted
                    size={50}
                    thickness={100}
                    speed={100}
                    color="rgb(79 70 229)"
                />
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col bg-gray-100 rounded-lg shadow-xl p-12"
        >
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-indigo-600 mb-6 text-center">
                Edit User
            </h1>

            <p className="rounded p-3 text-center text-sm md:text-base lg:text-lg text-gray-700 mb-4 shadow bg-white">
                Fill in the info that you want to save and press save when done
            </p>

            <div className="flex justify-start mb-6">
                <button
                    onClick={handleBack}
                    className="cursor-pointer rounded bg-indigo-600 hover:bg-indigo-700 text-lg p-3 text-white shadow-md hover:shadow-lg transition duration-300 ease-in-out flex items-center"
                >
                    <MdArrowBack className="mr-2" /> Back to User List
                </button>
            </div>

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
