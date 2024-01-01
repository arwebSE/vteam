import { useEffect, useRef } from 'react';
import L from 'leaflet';
import { useMap } from 'react-leaflet';
import icons from "./MapIcons";

export default function MoveToUser() {
    const map = useMap();
    const markerRef = useRef(null);

    useEffect(() => {
        const getGeolocation = () => {
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });
        };

        const setGeolocation = async () => {
            try {
                const position = await getGeolocation();
                const newPos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                if (markerRef.current) {
                    markerRef.current.setLatLng(newPos);
                } else {
                    markerRef.current = L.marker([newPos.lat, newPos.lng], {
                        icon: icons.userIcon,
                    }).addTo(map);
                }
                map.setView(newPos, map.getZoom());
            } catch (error) {
                console.log(error);
            }
        };

        setGeolocation();
    }, [map]);

    return null;
}