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
            // Create a new marker cluster group
            const markerClusterGroup = L.markerClusterGroup();

            for (let [city, coordinates] of Object.entries(m)) {
                coordinates.forEach(([lon, lat]) => {
                    // Create a new marker
                    const marker = L.marker([lat, lon], {
                        icon: icon.goalIcon,
                    });

                    // Add the marker to the cluster group instead of the map
                    markerClusterGroup.addLayer(marker);
                });
            }

            // Add the marker cluster group to the map
            map.addLayer(markerClusterGroup);
        }
    }, [map, markers]);

    return <></>;
};

export default Endpoints;