import React from "react";
import UserData from "../../components/User/UserData";
import withAuth from "../../util/withAuth";

import "./style.css";
import logo from "../../logo.png";

function User() {
    const userId = localStorage.userId;

    const userData = UserData({ id: userId });
    console.log(localStorage.userId);

    return (
        <div className="flex justify-center items-center w-full mt-20">
            <div className="w-full max-w-4xl mx-auto text-align-center">
                {userData && (
                <h1 className="mt-10 text-3xl md:text-4xl lg:text-5xl font-bold text-indigo-600 mb-8 font-sans text-center">Welcome to the Homepage '{ userData.username }'!</h1>
                )}
                <img src={logo} alt="logo" className="mx-auto w-40 h-40 md:w-60 md:h-60 lg:w-80 lg:h-80 mb-8" />
                <div className="flex flex-col mx-10 gap-5">
                    <a
                        className="hover:bg-indigo-700 text-center p-5 bg-indigo-600 text-white rounded"
                        href="/user/rent"
                    >
                        Rent bike
                    </a>
                    <a
                        className="hover:bg-indigo-700 text-center p-5 bg-indigo-600 text-white rounded"
                        href="/user/profile"
                    >
                        Profile
                    </a>
                    <a
                        className="hover:bg-indigo-700 text-center p-5 bg-indigo-600 text-white rounded"
                        href="/user/return"
                    >
                        Return bike
                    </a>
                </div>
            </div>
        </div>

    );
}

export default withAuth(User);
