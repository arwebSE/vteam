import withAuth from "../../../util/withAuth";
import { Link } from "react-router-dom";
import BikeReturn from "../../../components/User/ReturnBike";

import "./style.css";
//import logo from "../../logo.png";

function ReturnBike() {
    return (
        <div className="flex justify-center items-center w-full mt-20">
            <div className="w-full max-w-4xl mx-auto">
                <div className="flex flex-col items-center">
                    <div className="w-full flex flex-row justify-between items-center p-4">
                        <Link
                            to="/user/return"
                            className="cursor-pointer rounded bg-indigo-600 hover:bg-indigo-700 text-lg p-3 text-white shadow-md hover:shadow-lg transition duration-300 ease-in-out"
                        >
                            Back
                        </Link>
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-indigo-600">
                            Return bike
                        </h1>
                    </div>
                    <p className="rounded p-3 w-3/4 text-center text-sm md:text-base lg:text-lg text-gray-700 mb-4 shadow">
                        Return the bike.
                    </p>
                </div>
                <BikeReturn />
            </div>
        </div>
    );
}

export default withAuth(ReturnBike);
