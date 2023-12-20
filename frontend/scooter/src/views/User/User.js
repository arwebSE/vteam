import withAuth from "../../util/withAuth";
//import BikeMap from "../../components/BikeMap";

import "./style.css";
import logo from "../../logo.png";

function User() {
    return (
        <div className="flex mt-20">
            {/* Side Panel*/}
            <div className="w-1/6 p-4 bg-white h-screen">
                <h1 className="text-3xl font-bold text-indigo-600 mb-8">
                    User  '{ localStorage.userName }'!
                </h1>
                <div className="flex flex-col gap-5">
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
                </div>
            </div>
            {/* Main panel */}
            <div className="w-5/6 p-3 flex flex-col items-center bg-stone-100">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-indigo-600 mb-8 font-sans">Welcome to the Home Page '{ localStorage.userName }'!</h1>
                <img src={logo} alt="logo" className="mx-auto w-40 h-40 md:w-60 md:h-60 lg:w-80 lg:h-80 mb-8" />
            </div>
        </div>

    );
}

export default withAuth(User);
