import withAuth from "../../util/withAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import "./style.css";
import logo from "../../logo.png";

// Mock WithAuth inport
import withAuthMock from "../../test/Auth.mock";

function Home() {
    const navigate = useNavigate();
    const userRole = localStorage.getItem('userRole');

    useEffect(() => {
        if (userRole === "admin") {
            navigate('/admin');
        } else {
            navigate('/user');
        }
    }, [userRole, navigate]);

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center p-6 md:p-12 lg:p-16">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-indigo-600 mb-8 font-sans">Welcome to the Home Page!</h1>
                <img src={logo} alt="logo" className="mx-auto w-40 h-40 md:w-60 md:h-60 lg:w-80 lg:h-80 mb-8" />
                yo
            </div>
        </div>
    );
}


const exportedComponent = process.env.NODE_ENV === "test" ? withAuthMock(Home) : withAuth(Home);
export default exportedComponent