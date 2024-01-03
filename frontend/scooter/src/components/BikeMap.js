import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import icons from "./MapIcons";
import BikeMarker from "./Bike/bikeMarker";
import ZoneMarker from "./Zone/ZoneMarker";

import "leaflet/dist/leaflet.css";

function SetViewOnClick({ coords }) {
    const map = useMap();
    map.setView(coords, map.getZoom());

    return null;
}

function AddGoalMarker({ goals }) {
    const map = useMap();

    useEffect(() => {
        console.log("Goals in AddGoalMarker:", goals);
        if (goals && Object.keys(goals).length > 0) {
            for (let city in goals) {
                goals[city].forEach((marker) => {
                    L.marker({ lat: marker[1], lng: marker[0] }, { icon: icons.goalIcon }).bindPopup(`Goal at<br>Lat: ${marker[1]} Lon ${marker[0]}`).addTo(map);
                });
            }
        }
    }, [goals, map]);  // useEffect dependency on 'goals' and 'map'

    return null;
}


export default function BikeMap({ goals }) {
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
        <>
            <MapContainer center={currentLocation} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={currentLocation} icon={icons.userIcon}>
                    <Popup>You are here</Popup>
                </Marker>
                <ZoneMarker />
                <BikeMarker update={goals} />
                <SetViewOnClick coords={currentLocation} />
                <AddGoalMarker goals={goals} />
            </MapContainer>
        </>
    );
}
