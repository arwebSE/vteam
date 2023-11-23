import withAuth from "../../util/withAuth";

import "./style.css";
import logo from "../../logo.png";

function Home() {

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

export default withAuth(Home);