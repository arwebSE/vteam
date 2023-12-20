import React from "react";
import UserData from "../../../components/User/UserData";
import withAuth from "../../../util/withAuth";

import "./style.css";

function UserProfile() {
    const userId = localStorage.userId; // Get the user ID from localStorage

    // Use the UserData component to fetch and retrieve user data
    const userData = UserData({ id: userId });

    return (
        <div className="flex mt-20">
        {/* Side Panel*/}
            <div className="w-1/6 p-4 bg-white h-screen">
                <h1 className="text-3xl font-bold text-indigo-600 mb-8">
                    User profile - '{localStorage.userName}'!
                </h1>
                <div className="flex flex-col gap-5">
                    <a
                    className="hover:bg-indigo-700 text-center p-5 bg-indigo-600 text-white rounded"
                    href="/user"
                    >
                    Go back
                    </a>
                    <a
                    className="hover:bg-indigo-700 text-center p-5 bg-indigo-600 text-white rounded"
                    href="/user"
                    >
                    Edit profile
                    </a>
                </div>
            </div>
            {/* Main panel */}
            <div className="w-5/6 p-3 flex flex-col items-center bg-stone-100">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-indigo-600 mb-8 font-sans">
                    Profile page - '{ localStorage.userName }'!
                </h1>
            {/* Display user data */}
                {userData && (
                <div>
                    <p>Username: {userData.username}</p>
                    <p>Email: {userData.email}</p>
                    <p>Money: -need to add money to database-</p>
                </div>
                )}
            </div>
        </div>
    );
}

export default withAuth(UserProfile);
