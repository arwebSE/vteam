import withAuth from "../../../util/withAuth";
//import BikeMap from "../../components/BikeMap";

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
            </div>
        </div>
    );
}

export default withAuth(UserRent);
