import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import bikeModel from "../../models/bikeModel";

const BikeEdit = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const scooterId = location.pathname.split("/").pop();

    const [battery, setBattery] = useState("");
    const [lon, setLon] = useState("");
    const [lat, setLat] = useState("user");
    const [status, setStatus] = useState("available");
    const [city, setCity] = useState("");
    useEffect(() => {
        const fetchBike = async () => {
            try {
                const bike = await bikeModel.getBike(scooterId);
                setBattery(bike.battery);
                setLon(bike.lon);
                setLat(bike.lat);
                setStatus(bike.status);
                setCity(bike.city_cityid);
            } catch (error) {
                console.error("Failed to fetch bike:", error);
            }
        };

        fetchBike();
    }, [scooterId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await bikeModel.editUser(
                scooterId,
                lon,
                lat,
                battery,
                status,
                city
            );
            console.log("Bike updated successfully.");
            navigate("/admin/bike");
        } catch (error) {
            console.error("Failed to update bike:", error);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col bg-gray-100 rounded-lg shadow-xl p-12"
        >
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Edit Bike
            </h1>

            <label className="text-lg font-semibold mb-2">Id:</label>
            <input
                className="rounded p-3 mb-4 shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                type="text"
                defaultValue={"Scooter Id"}
                value={scooterId}
            />

            <label className="text-lg font-semibold mb-2">Lon:</label>
            <input
                className="rounded p-3 mb-4 shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                type="number"
                value={lon}
                onChange={(e) => setLon(e.target.value)}
            />

            <label className="text-lg font-semibold mb-2">Lat:</label>
            <input
                className="rounded p-3 mb-4 shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                type="number"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
            />

            <label className="text-lg font-semibold mb-2">Battery:</label>
            <input
                className="rounded p-3 mb-4 shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                type="number"
                value={battery}
                onChange={(e) => setBattery(e.target.value)}
            />

            <label className="text-lg font-semibold mb-2">Status</label>
            <label className="text-sm mb-2">Current status: {status}</label>
            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="rounded p-3 mb-6 shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            >
                <option value="available">available</option>
                <option value="unavailable">unaviable</option>
                <option value="service">service</option>
            </select>

            <button
                className="w-full rounded bg-indigo-600 hover:bg-indigo-700 text-white text-lg p-3 shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
                type="submit"
            >
                Save
            </button>
        </form>
    );
};

export default BikeEdit;
