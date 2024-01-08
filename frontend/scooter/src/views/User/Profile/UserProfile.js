import React from "react";
import UserData from "../../../components/User/UserData";
import withAuth from "../../../util/withAuth";
import { useNavigate } from "react-router-dom";

import "./style.css";

function UserProfile() {
    const userId = localStorage.userId; // Get the user ID from localStorage

    // Use the UserData component to fetch and retrieve user data
    const userData = UserData({ id: userId });
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/user/profile");
    };

    return (
        
        <div className="flex justify-center items-center w-full mt-20">
            <div className="w-full max-w-4xl mx-auto">
                <div className="flex flex-col items-center">
                    <div className="w-full flex flex-row justify-between items-center p-4">
                    
                    </div>
                </div>
                {userData && (
                <form
                id="updateForm"
                action="/user"
                method="put"
                className="flex flex-col bg-gray-100 rounded-lg shadow-xl p-12"
                >
                    <div className="flex justify-between mb-6">
                        <a
                        className="hover:bg-indigo-700 text-center p-5 bg-indigo-600 text-white rounded"
                        href="/user"
                        >
                        Back to Home
                        </a>
                        <a
                        className="hover:bg-indigo-700 text-center p-5 bg-indigo-600 text-white rounded"
                        href="/user/profile/edit"
                        >
                        Edit profile
                        </a>
                        <a
                        className="hover:bg-indigo-700 text-center p-5 bg-indigo-600 text-white rounded"
                        href="/user/profile/history"
                        >
                        User history
                        </a>
                    </div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-indigo-600 mb-8 font-sans text-center">
                        User profile
                    </h1>

                    <p className="rounded p-3 text-center text-sm md:text-base lg:text-lg text-gray-700 shadow bg-white mb-12">
                        User information
                    </p>

                    <div className="flex flex-col mb-4">
                        <label htmlFor="username_edit" className="text-lg font-semibold mb-2">Username:</label>
                        <input
                            className="rounded p-3 shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                            type="text"
                            id="username_edit"
                            name="username_edit"
                            value={userData.username}
                            readOnly
                            required
                        />
                    </div>

                    <div className="flex flex-col mb-4">
                        <label htmlFor="email_edit" className="text-lg font-semibold mb-2">Email:</label>
                        <input
                            className="rounded p-3 shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                            type="email"
                            id="email_edit"
                            name="email_edit"
                            value={userData.email}
                            readOnly
                            required
                        />
                    </div>

                    <div className="flex flex-col mb-4">
                        <label htmlFor="money_edit" className="text-lg font-semibold mb-2">Money:</label>
                        <input
                            className="rounded p-3 shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                            type="money"
                            id="money_edit"
                            name="money_edit"
                            value={userData.user_balance}
                            readOnly
                            required
                        />
                    </div>

                    <div className="flex justify-center">
                    <a
                            className="hover:bg-green-700 text-center p-4 bg-green-600 text-white rounded"
                            href="/user/profile/bank"
                        >
                            Add money
                    </a>
                    </div>
                </form>
                )}
            </div>
        </div>
        
    );
}

export default withAuth(UserProfile);


