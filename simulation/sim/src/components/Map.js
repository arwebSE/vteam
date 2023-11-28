import React from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import { useState, useEffect } from "react";
import L from 'leaflet';
import MyImage from '../img/user.png';

export default function SimpleMap() {
    const [currentLocation, setCurrentLocation] = useState({ lat: 59, lng: 16 });

    const userIcon = L.icon({
        iconUrl: MyImage,
        iconSize: [40, 40],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
    });

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCurrentLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
            },
            () => {
                console.log("Unable to retrieve your location");
            }
        );
    }, []);


    let settings = {
        latitude: 62,
        longitude: 16,
        zoom: 5,
        scrollWheelZoom: true,
        marker: true,
    }




    const handleMapClick = (e) => {
        setCurrentLocation(e.latlng);
    };
    return (

        <MapContainer center={[settings.latitude, settings.longitude]} zoom={settings.zoom} scrollWheelZoom={settings.scrollWheelZoom} onClick={handleMapClick}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={currentLocation} icon={userIcon}>
                <Popup>
                    You are here
                </Popup>
            </Marker>
        </MapContainer>

    );
}