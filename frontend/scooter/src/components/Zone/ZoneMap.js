import React from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import { useState, useEffect } from "react";
import AddZone from "./AddZone";
import icons from "../MapIcons";
import zoneModel from "../../models/zoneModel";

import "leaflet/dist/leaflet.css";
import ZoneMarker from "./ZoneMarker";

function SetViewToUser({ coords }) {
    const map = useMap();
    useEffect(() => {
        map.setView(coords, map.getZoom());
    }, [coords, map]); // Empty dependency array means this effect will only run once
    return null;
}


export default function ZoneMap() {
    const [color, setColor] = useState("blue");
    const [zoneType, setZoneType] = useState("Parking Spot");
    const [points, setPoints] = useState([]);
    const [city, setCity] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        let turfPoints = points;
        turfPoints.push(points[0]);
        const zone = {
            zonetype: zoneType,
            coordinates: `POLYGON((${points.join(', ')}))`,
            city_name: city
        };
        await zoneModel.createZone(zone)
    }

    const handleMapClick = async (coords) => {
        setPoints([...points, coords]);
    };

    function colorManager(e) {
        setColor(e.target.value);
        setZoneType(e.target.options[e.target.selectedIndex].text);
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
                <ZoneMarker />
                <AddZone color={color} setCity={setCity} onMapClick={handleMapClick} />
                <SetViewToUser coords={currentLocation} />
            </MapContainer>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col w-11/12">

                <label htmlFor="zoneType">Zone Name</label>
                <select onChange={colorManager}>
                    <option value={{ color: "green", type: "Parking Spot" }} name="Parking Spot">Parking Spot</option>
                    <option value="red" name="No Go Zone">No Go Zone</option>
                    <option value="orange" name="Restricted Speed">Restricted Speed</option>
                    <option value="blue" name="City">City</option>
                </select>

                {points.length > 2 && (
                    <input type="submit" value="Create Zone" />
                )}
            </form>
        </div>
    );
}