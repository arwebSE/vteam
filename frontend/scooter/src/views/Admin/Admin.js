import withAuth from "../../util/withAuth";
import Map from "../../components/Map";

import "./style.css";
import logo from "../../logo.png";

function Admin() {
    return (
        <>
            <div className="flex p-3 flex-col items-center justify-center bg-stone-100 mt-16">
                <div className="map-container">
                    <Map />
                </div>
            </div>
            <div className="relative h-screen bg-gray-100">
                <div className="w-full">
                    <div className="flex items-center justify-center">
                        <div className="w-3/4 p-10 bg-white rounded-lg shadow-lg max-w-md md:max-w-lg">
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-indigo-600 mb-8 font-sans">
                                ADMIN
                            </h1>
                            <div className="flex flex-row justify-center gap-5">
                                <a
                                    className="hover:bg-indigo-700 text-xl text-center p-5 bg-indigo-600 text-white rounded"
                                    href="/admin/user"
                                >
                                    Manage Users
                                </a>
                                <a
                                    className="hover:bg-indigo-700 text-xl text-center p-5 bg-indigo-600 text-white rounded"
                                    href="/admin/bike"
                                >
                                    Manage Bikes
                                </a>
                                <a
                                    className="hover:bg-indigo-700 text-xl text-center p-5 bg-indigo-600 text-white rounded"
                                    href="/admin/zone"
                                >
                                    Manage Zones
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default withAuth(Admin);
