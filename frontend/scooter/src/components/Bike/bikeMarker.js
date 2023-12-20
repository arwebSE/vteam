import React from "react";
import { useState, useEffect } from "react";
import bikeModel from "../../models/bikeModel";
import { Marker, Popup } from "react-leaflet";
//import L from "leaflet";
//import { renderToString } from "react-dom/server";
//import { BsScooter } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import icons from "../MapIcons";

// const bikeIcon = L.divIcon({
//     html: renderToString(
//         <BsScooter style={{ fontSize: "40px", color: "green" }} />
//     ),
//     className: "my-custom-icon",
//     iconAnchor: [20, 40],
//     popupAnchor: [0, -40],
// });

export default function MarkLocationMap() {
    const navigate = useNavigate();

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
    });
    return (
        <>
            {bikes.map((bike) => (
                bike.lat && bike.lng(
                    <Marker
                        key={bike.scooterId}
                        position={[bike.lat, bike.lon]}
                        icon={icons.bikeIcon}
                        eventHandlers={{
                            dblclick: (e) => {
                                manageBike(bike.scooterId);
                            },
                        }}
                    >
                        <Popup>Scooter: {bike.scooterId}</Popup>
                    </Marker>
                )
            ))}
        </>
    );
}
