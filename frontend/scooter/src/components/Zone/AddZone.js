import React from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";
import { useEffect } from "react";
//import icons from "../MapIcons";
import bikeModel from "../../models/bikeModel";

function AddZone({ onMapClick, color, setCity }) {

    function ClickHandler() {
        const map = useMap();

        useEffect(() => {
            const handleClick = async (e) => {
                const { lat, lng } = e.latlng;
                if (onMapClick) {
                    onMapClick(lat + " " + lng);
                }
                L.circle([lat, lng], {
                    color: color,
                    fillColor: color,
                    fillOpacity: 0.5,
                    radius: 3,
                }).addTo(map);
                const newCity = await bikeModel.getBikeCity(lat, lng);
                setCity(newCity);
                // console.log("City:", city, ", set to:", newCity);
            };

            map.on("click", handleClick);

            return () => {
                map.off("click", handleClick);
            };
        }, [map]);
        return null;
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <ClickHandler />
        </div>
    );
}

export default AddZone;