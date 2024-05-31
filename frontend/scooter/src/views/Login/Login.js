import { useContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc"

import urlModel from "../../model/getUrl";

// auth imports
import { AuthContext } from "../../util/AuthContext";
import { handleLogin, handleOauthlogin } from "../../util/authUtils";

import "./style.css";
import boi from "../../boi.png";


function Login() {
    const url = urlModel.getUrl();
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(window.location.search);
    const isLoggedInState = urlParams.get('state');
    const userid = urlParams.get('userid');
    const [username, setUsername] = useState('');
    const [passwd, setPasswd] = useState('');



    const login = useCallback((e) => {
        e.preventDefault();
        handleLogin(setIsLoggedIn, username, passwd);
    }, [setIsLoggedIn, username, passwd]);

    useEffect(() => {

        if (isLoggedInState) {
            const oauthlogin = () => {
                handleOauthlogin(setIsLoggedIn, isLoggedInState, userid);
            };
            oauthlogin();
        }
    }, [isLoggedInState, setIsLoggedIn, userid]);



    useEffect(() => {
        if (isLoggedIn) {
            navigate('/home');
        }   // Happens if isLoggedIn changes
    }, [isLoggedIn, navigate]);


    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="p-8 md:p-12 lg:p-16 rounded-lg shadow-lg bg-white max-w-md md:max-w-lg">
                <img
                    src={boi}
                    alt="boi"
                    className="scooter mx-auto h-16 md:h-20 lg:h-24 w-auto mb-6"
                />
                <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-extrabold text-indigo-600 mb-8 font-sans">
                    Welcome to BOI
                </h2>

                <form onSubmit={login} className="space-y-6">
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm md:text-base lg:text-lg font-medium text-gray-700"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm md:text-base lg:text-lg font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={passwd}
                            onChange={(e) => setPasswd(e.target.value)}
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-base md:text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Login
                    </button>

                </form>

                <a
                    className="w-full mt-6 flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-base md:text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 space-y-6"
                    href="/signup"
                >
                    Sign Up
                </a>

                <a
                    className="w-full mt-6 flex items-baseline justify-center  border border-transparent rounded-md shadow-sm text-base md:text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    href={url + "/oauth2/login/google"}
                >
                    <div className="googleIcon pt-1">
                        <FcGoogle />
                    </div>
                    <div className="signintext px-3">
                        Sign in with Google
                    </div>
                </a>


            </div>
        </div>
    );
}

export default Login;
