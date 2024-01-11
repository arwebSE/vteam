import React, { useEffect } from 'react';
import L from 'leaflet';
import { useMap } from 'react-leaflet';
import icon from '../MapIcons';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';

const Endpoints = ({ markers }) => {
    const map = useMap();
    let m = markers.markers;

    useEffect(() => {
        if (m) {
            const markerClusterGroup = L.markerClusterGroup();

            for (let [city, coordinates] of Object.entries(m)) {
                coordinates.forEach(([lon, lat]) => {
                    const marker = L.marker([lat, lon], {
                        icon: icon.goalIcon,
                    });

                    markerClusterGroup.addLayer(marker);
                });
            }

            map.addLayer(markerClusterGroup);
        }
    }, [map, markers]);

    return <></>;
};

export default Endpoints;