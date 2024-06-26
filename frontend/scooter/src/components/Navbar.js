import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// auth imports
import { AuthContext } from "../util/AuthContext";
import { handleLogout } from "../util/authUtils";

function Navbar() {
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const logout = () => handleLogout(setIsLoggedIn, navigate);

    const userRole = localStorage.getItem('userRole');

    if (location.pathname === "/") return null; // hide on Login page

    return (
        <nav className="mb-2 bg-white bg-opacity-75 backdrop-blur-lg p-4 text-gray-800 fixed w-full top-0 z-[1001] shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex gap-10">
                {userRole === "admin" && (
                    <div className="flex items-center">
                        <a
                            href="/admin"
                            className="text-xl text-gray-800 hover:text-gray-600 transition-colors align-bottom"
                        >
                            admin
                        </a>
                    </div>
                    )}
                    <div className="flex items-center">
                        <a
                            href="/user"
                            className="text-xl text-gray-800 hover:text-gray-600 transition-colors align-bottom"
                        >
                            user
                        </a>
                    </div>
                </div>
                <div className="flex items-center">
                    <a
                        href="/home"
                        className="text-2xl font-extrabold text-indigo-600 font-sans"
                    >
                        boi
                    </a>
                </div>
                <div className="space-x-4">
                    {isLoggedIn && (
                        <button
                            onClick={logout}
                            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 transition-colors"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
