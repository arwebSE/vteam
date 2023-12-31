import React from "react";
import { useState, useEffect } from "react";
import bikeModel from "../../models/bikeModel";
import L from "leaflet";
import { useMap } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import icons from "../MapIcons";

export default function MarkLocationMap() {
    const navigate = useNavigate();
    const map = useMap();
    function manageBike(id) {
        console.log(id);
        navigate("/admin/bike/edit/" + id);
    }

    const [bikes, setBikes] = useState([]);
    useEffect(() => {
        const updateBikes = async () => {
            setBikes(await bikeModel.getBikes());
        };
        updateBikes();
    }, [map]);

    useEffect(() => {
        if (bikes) {
            bikes.forEach(bike => {
                if (bike.lat && bike.lon) {
                    L.marker([bike.lat, bike.lon],
                        {
                            icon: icons.bikeIcon,
                        }).on('dblclick', function (e) {
                            manageBike(bike.scooterId);
                        }).bindPopup(`Scooter: ${bike.scooterId}`).addTo(map);
                }
            });
        }
    }, [map, manageBike, bikes]);

    function Markers() {
        return (
            <>

            </>
        );
    }

    return (
        <Markers />
    );
}
