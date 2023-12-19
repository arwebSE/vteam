import React from "react";

import * as turf from '@turf/turf';

import L from 'leaflet';
// import { Marker, Popup } from "react-leaflet";
import { useState, useEffect } from "react";
import { useMap } from "react-leaflet";

import wellknown from 'wellknown';

import zoneModel from "../../models/zoneModel";

const zones = {}

export default function ZoneMarker() {
    const [zone, setZone] = useState(null);
    const map = useMap();

    useEffect(() => {
        async function getZone() {
            const zone = await zoneModel.getZones();
            setZone(zone);
        }
        getZone();
    }, []);

    useEffect(() => {
        const colors = { "No Go Zone": 'red', "City": 'blue', "Parking Spot": 'green', "Restricted Speed": 'orange' }
        if (zone) {
            zone.forEach(z => {
                if (z.coordinates !== "POLYGON(())") {
                    let geojson = wellknown.parse(z.coordinates);
                    let reversedCoordinates = geojson.coordinates[0].map(coord => coord.reverse());
                    zones[z.zoneId] = [reversedCoordinates];
                    let polygon = turf.polygon([reversedCoordinates], { name: z.zonetype });
                    L.geoJSON(polygon, {
                        style: {
                            color: colors[z.zonetype]
                        }
                    }).addTo(map);
                }
            });
        }
    }, [zone, map]);

    if (!zone) {
        return null;
    }

    return (
        <></>
    );
}