import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";

import bikeModel from "../../models/bikeModel";
import cityModel from "../../models/cityModel";
import MoveToUser from "../MoveToUser";
import BikeMarker from "./bikeMarker";
import ZoneMarker from "../Zone/ZoneMarker";
import icons from "../MapIcons";

import "leaflet/dist/leaflet.css";


const bikeLocation = {};
let city = "";

const createBike = async () => {
    let id = await cityModel.getCity(city);
    if (id) {
        const bike = {
            lon: bikeLocation.lng,
            lat: bikeLocation.lat,
            battery: 100,
            status: "available",
            city_cityid: id.cityId,
        };
        const response = await bikeModel.createBike(bike);
        console.log(response);
    }
};

export default function MarkLocationMap() {

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

    const currentLocation = { lat: 59, lng: 16 }; // Default location

    return (
        <div className="flex justify-center items-center flex-col gap-5">
            <div className="flex justify-center w-full">
                <MapContainer
                    center={currentLocation}
                    zoom={13}
                    scrollWheelZoom={true}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <ZoneMarker />
                    <BikeMarker />
                    <ClickHandler />
                    <MoveToUser />
                </MapContainer>
            </div>
            <button
                className="flex justify-center w-11/12 rounded bg-indigo-600 hover:bg-indigo-700 text-white text-lg p-3 shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
                onClick={() => createBike()}
            >
                Add bike
            </button>
        </div>
    );
}
