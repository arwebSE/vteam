import React from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import { useState, useEffect } from "react";
//import L from "leaflet";
import BikeMarker from "./Bike/bikeMarker";
import icons from "./MapIcons";

import "leaflet/dist/leaflet.css";

function SetViewOnClick({ coords }) {
    const map = useMap();
    map.setView(coords, map.getZoom());

    return null;
}

export default function BikeMap() {
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
        <MapContainer center={currentLocation} zoom={13} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={currentLocation} icon={icons.userIcon}>
                <Popup>You are here</Popup>
            </Marker>
            <BikeMarker />
            <SetViewOnClick coords={currentLocation} />
        </MapContainer>
    );
}
