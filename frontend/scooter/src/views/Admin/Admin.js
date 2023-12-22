import withAuth from "../../util/withAuth";
import BikeMap from "../../components/BikeMap";

import "./style.css";
//import logo from "../../logo.png";


// Mock imports
import withAuthMock from "../../test/Auth.mock";
import MockBikeMap from "../../test/BikeMap.mock";
function Admin() {
    return (
        <div className="flex mt-20">
            {/* Side Panel*/}
            <div className="w-1/6 p-4 bg-white h-screen">
                <h1 className="text-3xl font-bold text-indigo-600 mb-8">
                    ADMIN
                </h1>
                <div className="flex flex-col gap-5">
                    <a
                        className="hover:bg-indigo-700 text-center p-5 bg-indigo-600 text-white rounded"
                        href="/admin/user"
                    >
                        Manage Users
                    </a>
                    <a
                        className="hover:bg-indigo-700 text-center p-5 bg-indigo-600 text-white rounded"
                        href="/admin/bike"
                    >
                        Manage Bikes
                    </a>
                    <a
                        className="hover:bg-indigo-700 text-center p-5 bg-indigo-600 text-white rounded"
                        href="/admin/zone"
                    >
                        Manage Zones
                    </a>
                </div>
            </div>
            {/* Main */}
            <div className="w-5/6 p-3 flex flex-col items-center bg-stone-100">
                <div className="map-container">
                    <BikeMap />
                </div>
            </div>
        </div>
    );
}

function MockAdmin() {
    return (
        <div className="flex mt-20">
            {/* Side Panel*/}
            <div className="w-1/6 p-4 bg-white h-screen">
                <h1 className="text-3xl font-bold text-indigo-600 mb-8">
                    ADMIN
                </h1>
                <div className="flex flex-col gap-5">
                    <a
                        className="hover:bg-indigo-700 text-center p-5 bg-indigo-600 text-white rounded"
                        href="/admin/user"
                    >
                        Manage Users
                    </a>
                    <a
                        className="hover:bg-indigo-700 text-center p-5 bg-indigo-600 text-white rounded"
                        href="/admin/bike"
                    >
                        Manage Bikes
                    </a>
                    <a
                        className="hover:bg-indigo-700 text-center p-5 bg-indigo-600 text-white rounded"
                        href="/admin/zone"
                    >
                        Manage Zones
                    </a>
                </div>
            </div>
            {/* Main */}
            <div className="w-5/6 p-3 flex flex-col items-center bg-stone-100">
                <div className="map-container">
                    <MockBikeMap />
                </div>
            </div>
        </div>
    );




}

const exportedComponent = process.env.NODE_ENV === "test" ? withAuthMock(MockAdmin) : withAuth(Admin);
export default exportedComponent
