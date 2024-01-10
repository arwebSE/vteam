// BikeMapUser.js
import React, { useState, useEffect } from "react";
import { MapContainer, useMap, TileLayer, Marker, Popup } from "react-leaflet";
import BikeMarkerUser from "../Bike/bikeMarkerUser";
import ZoneMarker from "../Zone/ZoneMarker";
import icons from "../MapIcons";

import "leaflet/dist/leaflet.css";

function SetViewOnClick({ coords }) {
  const map = useMap();
  map.setView(coords, map.getZoom());
  return null;
}

export default function BikeMapUser() {
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
      <MapContainer center={currentLocation} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={currentLocation} icon={icons.userIcon}>
          <Popup>You are here</Popup>
        </Marker>
        <ZoneMarker />
        <BikeMarkerUser />
        <SetViewOnClick coords={currentLocation} />
      </MapContainer>
      <a
          className="w-4/6 hover:bg-indigo-700 text-center p-5 mt-15 bg-indigo-600 text-white rounded"
          href="/user/return"
          >
          Return rented bikes
      </a>
    </div>
  );
}
