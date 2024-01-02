import React, { useState, useEffect, useCallback } from "react";
import bikeModel from "../../models/bikeModel";
import L from "leaflet";
import { useMap } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import icons from "../MapIcons";

export default function MarkLocationMap({ createBike }) {
    const navigate = useNavigate();
    const map = useMap();

    const manageBike = useCallback((id) => {
        console.log(id);
        navigate("/admin/bike/edit/" + id);
    }, [navigate]);

    const [bikes, setBikes] = useState([]);

    useEffect(() => {
        const updateBikes = async () => {
            setBikes(await bikeModel.getBikes());
        };
        updateBikes();
    }, [createBike]);

    useEffect(() => {
        if (bikes) {
            bikes.forEach((bike) => {
                if (bike.lat && bike.lon) {
                    L.marker([bike.lat, bike.lon], {
                        icon: icons.bikeIcon,
                    })
                        .on("dblclick", function (e) {
                            manageBike(bike.scooterId);
                        })
                        .bindPopup(`Scooter: ${bike.scooterId}`)
                        .addTo(map);
                }
            });
        }
    }, [bikes, map, manageBike]);

    function Markers() {
        return <></>;
    }

    return <Markers />;
}
