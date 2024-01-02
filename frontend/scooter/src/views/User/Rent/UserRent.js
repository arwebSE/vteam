import withAuth from "../../../util/withAuth";
import BikeMapUser from "../../../components/User/BikeMapUser";

import "./style.css";
//import logo from "../../logo.png";

function UserRent() {
    return (
        <div className="flex mt-20">
            {/* Side Panel*/}
            <div className="w-1/6 p-4 bg-white h-screen">
                <h1 className="text-3xl font-bold text-indigo-600 mb-8">
                    User Rent
                </h1>
                <div className="flex flex-col gap-5">
                    <a
                    className="hover:bg-indigo-700 text-center p-5 bg-indigo-600 text-white rounded"
                    href="/user"
                    >
                    Go back
                    </a>
                </div>
            </div>
            {/* Main panel */}
            <div className="w-5/6 p-3 flex flex-col items-center bg-stone-100">
                <BikeMapUser />
                <a
                    className="hover:bg-indigo-700 text-center p-5 mt-5 bg-indigo-600 text-white rounded"
                    href="/user/return"
                    >
                    Return rented bikes
                </a>
            </div>
        </div>
    );
}

export default withAuth(UserRent);
