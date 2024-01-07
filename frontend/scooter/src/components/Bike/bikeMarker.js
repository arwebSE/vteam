import { useState, useEffect, useCallback } from "react";
import bikeModel from "../../models/bikeModel";
import L from "leaflet";
import { useMap } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import icons from "../MapIcons";

import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';

export default function BikeMarker({ update }) {
    const navigate = useNavigate();
    const map = useMap();

    const manageBike = useCallback((id) => {
        console.log(id);
        navigate("/admin/bike/edit/" + id);
    }, [navigate]);

    const [bikes, setBikes] = useState([]);
    const [cluster, setCluster] = useState(null);

    useEffect(() => {
        const updateBikes = async () => {
            setBikes(await bikeModel.getBikes());
        };

        // Call updateBikes immediately
        updateBikes();

        // Then call updateBikes every 10 seconds
        const intervalId = setInterval(updateBikes, 5000);

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, [update]);

    useEffect(() => {
        // Remove old cluster
        if (cluster) {
            map.removeLayer(cluster);
        }

        // Create a new marker cluster group
        const markerClusterGroup = L.markerClusterGroup();

        if (bikes) {
            // Update existing markers
            bikes.forEach((bike) => {
                // Create new marker for new bike
                const newMarker = L.marker([bike.lat, bike.lon], {
                    icon: icons.bikeIcon,
                })
                    .on("dblclick", function (e) {
                        manageBike(bike.scooterId);
                    })
                    .bindPopup(`Scooter: ${bike.scooterId} Speed: ${bike.speed}`);

                // Add the marker to the cluster group instead of the map
                markerClusterGroup.addLayer(newMarker);
            });
        }

        // Add the marker cluster group to the map
        map.addLayer(markerClusterGroup);

        // Save new cluster
        setCluster(markerClusterGroup);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bikes, map, manageBike]);
    return null; // No need to render anything directly
}