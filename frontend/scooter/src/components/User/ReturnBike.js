import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { useLocation } from "react-router-dom";

import L from "leaflet";

import bikeModel from "../../models/bikeModel";
import cityModel from "../../models/cityModel";
import userModel from "../../models/userModel";
import userToBikeModel from "../../models/userToBikeModel";
import MoveToUser from "../MoveToUser";
import BikeMarker from "../Bike/bikeMarker";

import icons from "../MapIcons";

import "leaflet/dist/leaflet.css";

const bikeLocation = {};
let city = "";

const MarkLocationMap = () => {
    const location = useLocation();
    const scooterId = location.pathname.split("/").pop();

    const returnBike = async () => {
        try {
        const allBikes = await userToBikeModel.getAll();

        // Filter bikes based on user_userid
        const userBike = allBikes.filter(bike => bike.scooterId === parseInt(scooterId));
        console.log(userBike);

        const timeNow = new Date();
        const returnTime = new Date(userBike[0].stopTime);
        const correctlyReturned = timeNow < returnTime;
        const timeDiff = ((timeNow.getTime() - returnTime.getTime()) / (1000 * 60));

        // For every extra minute you rent it over the time,
        // the user has to pay 20 + 3/min
        const startPrice = 20;
        const extraPrice = parseInt(startPrice + (timeDiff * 3));

        const scooterData = await bikeModel.getBike(scooterId);
        const startTime = new Date(userBike[0].startTime);
        const timeDiffFromStart = ((timeNow.getTime() - startTime.getTime()) / (1000 * 60));

        // 1 % battery = 6 minutes
        // Calculate amount of rented time, for every 6 minutes rented, reduce 1 % battery
        const batteryDrain = (scooterData.battery * 6) - timeDiffFromStart;
        let batteryDrainInPerc = parseInt(batteryDrain / 6);
        if (batteryDrainInPerc < 0) {
            batteryDrainInPerc = 0;
        }
        let id = await cityModel.getCity(city);
        if (id) {
            if (correctlyReturned === false) {
                const response = await userModel.removeMoney(localStorage.userId, extraPrice);
                console.log(response);
            }
            const returnedBike = {
                scooterId: scooterId,
                lon: bikeLocation.lng,
                lat: bikeLocation.lat,
                battery: batteryDrainInPerc,
                status: "available",
            };
            const responseBikeModel = await bikeModel.returnBike(returnedBike);
            const responseUserToBike = await userToBikeModel.delete(userBike[0].idUsertobike);
            console.log(responseBikeModel);
            console.log(responseUserToBike);
            document.getElementById("map");
        }
        } catch (error) {
            console.log("Error in returnBike: ", error);
        }
    };

    function ClickHandler() {
        const map = useMap();
        const marker = useRef(null);

        useEffect(() => {
            const handleClick = async (e) => {
                const { lat, lng } = e.latlng;
                if (marker.current) {
                    marker.current.remove();
                }
                marker.current = L.marker([lat, lng], {
                    icon: icons.createIcon,
                }).addTo(map);
                bikeLocation.lat = lat;
                bikeLocation.lng = lng;
                city = await bikeModel.getBikeCity(lat, lng);
            };

            map.on("click", handleClick);

            return () => {
                map.off("click", handleClick);
            };
        }, [map]);

        return null;
    }
    const [currentLocation, setCurrentLocation] = useState({
        lat: 59,
        lng: 16,
    });

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const newPos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                setCurrentLocation(newPos);
            },
            () => {
                console.log("Unable to retrieve your location");
            }
        );
    }, []);

    return (
        <div className="flex flex-col items-center gap-5">
                <MapContainer
                    center={currentLocation}
                    zoom={13}
                    scrollWheelZoom={true}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <BikeMarker />
                    <ClickHandler />
                    <MoveToUser />
                </MapContainer>
            <button
                className="w-4/6 rounded bg-indigo-600 hover:bg-indigo-700 text-white text-lg p-3 shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
                onClick={() => returnBike()}
            >
                Return bike
            </button>
        </div>
    );
};

export default MarkLocationMap;
