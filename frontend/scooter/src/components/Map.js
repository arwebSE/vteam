import React from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import { useState, useEffect } from "react";
import L from "leaflet";
import { FaMapMarkerAlt } from "react-icons/fa";
import { renderToString } from "react-dom/server";

import "leaflet/dist/leaflet.css";

function SetViewOnClick({ coords }) {
    const map = useMap();
    map.setView(coords, map.getZoom());

    return null;
}

export default function Map() {
    const [currentLocation, setCurrentLocation] = useState({
        lat: 59,
        lng: 16,
    });

    const userIcon = L.divIcon({
        html: renderToString(
            <FaMapMarkerAlt style={{ fontSize: "40px", color: "red" }} />
        ),
        className: "my-custom-icon",
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
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
            <Marker position={currentLocation} icon={userIcon}>
                <Popup>You are here</Popup>
            </Marker>
            <SetViewOnClick coords={currentLocation} />
        </MapContainer>
    );
}
