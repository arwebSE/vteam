import React from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import { useState, useEffect } from "react";
import AddZone from "./AddZone";
import icons from "../MapIcons";
import zoneModel from "../../models/zoneModel";

import "leaflet/dist/leaflet.css";




function SetViewToUser({ coords }) {
    const map = useMap();
    map.setView(coords, map.getZoom());
    return null;
}


export default function ZoneMap() {
    const [color, setColor] = useState("blue");
    const [radius, setRadius] = useState(10);
    const [zoneType, setZoneType] = useState("Parking Spot");

    const [clickedLocation, setClickedLocation] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();

        const zone = {
            zoneType: zoneType,
            radius: radius,
            lat: clickedLocation.lat,
            lng: clickedLocation.lng,
        };
        console.log(zone);
        await zoneModel.createZone(zone)
    }

    const handleMapClick = (coords) => {
        setClickedLocation(coords);
    };

    function colorManager(e) {
        setColor(e.target.value);
        setZoneType(e.target.name);
    }
    function radiusManager(e) {
        setRadius(e.target.value);
    }
    const [currentLocation, setCurrentLocation] = useState({ lat: 59, lng: 16, });

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
        <div className="flex flex-col w-full items-center">
            <MapContainer center={currentLocation} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={currentLocation} icon={icons.userIcon}>
                    <Popup>You are here</Popup>
                </Marker>
                <AddZone color={color} radius={radius} onMapClick={handleMapClick} />
                <SetViewToUser coords={currentLocation} />
            </MapContainer>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col w-11/12">
                <label htmlFor="zoneType">Zone Name</label>
                <select onChange={colorManager}>
                    <option value="green" name="Parking Spot">Parking Spot</option>
                    <option value="red" name="No Go Zone">No Go Zone</option>
                    <option value="orange" name="Restricted Speed">Restricted Speed</option>
                    <option value="blue" name="City">City</option>
                </select>
                <input type="range" min="1" max="6000" value={radius} onChange={radiusManager} />
                <label htmlFor="radius">Radius</label>
                <p>{radius} m</p>
                <input type="submit" value="Create Zone" />
            </form>
        </div>
    );
}
