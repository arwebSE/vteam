import React from "react";
import { useMap } from "react-leaflet";
import { useState, useEffect } from "react";
import L from "leaflet";
import { Marker, Popup } from "react-leaflet";
import { renderToString } from "react-dom/server";
import { FaCircleDot } from "react-icons/fa6";

const userIcon = L.divIcon({
    html: renderToString(
        <FaCircleDot style={{ fontSize: "20px", color: "red" }} />
    ),
    className: "my-custom-icon",
    popupAnchor: [0, -40],
});

function SetViewOnClick({ coords }) {
    const map = useMap();
    map.setView(coords, map.getZoom());

    return null;
}

export default function MoveToUser() {
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
            (error) => {
                console.log(error);
            }
        );
    }, []);

    return (
        <>
            <Marker position={currentLocation} icon={userIcon}>
                <Popup>You are here</Popup>
            </Marker>
            <SetViewOnClick coords={currentLocation} />
        </>
    );
}