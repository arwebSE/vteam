import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import icons from "../MapIcons";

import ZoneMarker from "../Zone/ZoneMarker";
import LowBatteryBikes from "./LowBatteryBikes";


function SetViewOnClick({ coords }) {
    const map = useMap();
    map.setView(coords, map.getZoom());

    return null;
}


export default function LowBatteryMap() {
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
        <div className="flex justify-center items-center pt-10 mt-10">
            <MapContainer center={currentLocation} zoom={13} scrollWheelZoom={true} >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={currentLocation} icon={icons.userIcon}>
                    <Popup>You are here</Popup>
                </Marker>
                <ZoneMarker />
                <LowBatteryBikes />
                <SetViewOnClick coords={currentLocation} />
            </MapContainer >
        </div>
    );
}
