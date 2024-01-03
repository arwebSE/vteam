import React, { useEffect } from 'react';
import L from 'leaflet';
import { useMap } from 'react-leaflet';
import icon from '../MapIcons';

const Endpoints = ({ markers }) => {
    const map = useMap();
    let m = markers.markers;

    useEffect(() => {
        if (m) {
            console.log("Running")
            for (let [city, coordinates] of Object.entries(m)) {
                coordinates.forEach(([lon, lat]) => {
                    L.marker([lat, lon], {
                        icon: icon.goalIcon,
                    }).addTo(map);
                });
            }
        }
    }, [map, markers]);

    return <></>;
};

export default Endpoints;