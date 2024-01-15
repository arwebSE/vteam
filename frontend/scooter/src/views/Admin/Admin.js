import withAuth from "../../util/withAuth";
import BikeMap from "../../components/BikeMap";

import "./style.css";
//import logo from "../../logo.png";

import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';


// Mock imports
import withAuthMock from "../../test/Auth.mock";
import MockBikeMap from "../../test/BikeMap.mock";

function Admin() {
    const userRole = localStorage.getItem('userRole');

    const navigate = useNavigate();

    useEffect(() => {
        if (userRole !== "admin") {
            navigate('/home');
        }
    }, [userRole, navigate]);

    return (
        <div className="flex mt-20">
            {/* Main */}

            <div className=" p-4 bg-gray h-screen">
                <h1 className="text-3xl font-bold text-indigo-600 mb-8">
                    ADMIN
                </h1>

                <BikeMap />
                <div className="flex gap-5 mt-5 items-center justify-center">

                    <div className="flex gap-5 flex-wrap justify-center">
                        <a
                            className="hover:bg-indigo-700 text-center p-5 bg-indigo-600 text-white rounded"
                            href="/admin/user"
                        >
                            Manage Users
                        </a>
                        <a className="hover:bg-indigo-700 text-center p-5 bg-indigo-600 text-white rounded"
                            href="/admin/simulation"
                        >
                            Simulation
                        </a>
                    </div>

                    <div className="flex gap-5 flex-wrap justify-center">
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
                        <a
                            className="hover:bg-indigo-700 text-center p-5 bg-indigo-600 text-white rounded"
                            href="/admin/lowbattery"
                        >
                            Low battery bikes
                        </a>
                    </div>

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
