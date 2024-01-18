import { useState, useEffect, useCallback } from "react";
import bikeModel from "../../models/bikeModel";
import { useNavigate } from "react-router-dom";
import icons from "../MapIcons";
import L from "leaflet";
import { useMap } from "react-leaflet";

import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';

export default function BikeMarker({ update }) {
  const navigate = useNavigate();
  const map = useMap();

  const manageBike = useCallback((id) => {
      navigate("/user/rent/bike/" + id);
  }, [navigate]);

  const [bikes, setBikes] = useState([]);
  const [cluster, setCluster] = useState(null);

  useEffect(() => {
      const updateBikes = async () => {
          setBikes(await bikeModel.getAllAvailable());
      };

      updateBikes();

      const intervalId = setInterval(updateBikes, 5000);

      return () => clearInterval(intervalId);
  }, [update]);

  useEffect(() => {
      if (cluster) {
          map.removeLayer(cluster);
      }

      const markerClusterGroup = L.markerClusterGroup();

      if (bikes) {
          bikes.forEach((bike) => {
              const newMarker = L.marker([bike.lat, bike.lon], {
                  icon: icons.bikeIcon,
              })
                  .on("dblclick", function (e) {
                      manageBike(bike.scooterId);
                  })
                  .bindPopup(`Scooter: ${bike.scooterId} Speed: ${bike.speed}`);

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
