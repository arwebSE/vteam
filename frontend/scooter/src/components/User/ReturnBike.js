import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { useLocation } from "react-router-dom";

import L from "leaflet";

import bikeModel from "../../models/bikeModel";
import cityModel from "../../models/cityModel";
import userModel from "../../models/userModel";
import userToBikeModel from "../../models/userToBikeModel";
import MoveToUser from "../MoveToUser";
import logModel from "../../models/logModel";
import zoneModel from "../../models/zoneModel";

import BikeMarker from "../Bike/bikeMarker";
import ZoneMarker from "../Zone/ZoneMarker";

import * as turf from '@turf/turf';
import wellknown from 'wellknown';

import icons from "../MapIcons";

import "leaflet/dist/leaflet.css";

const bikeLocation = {};
let city = "";

const MarkLocationMap = () => {
    const location = useLocation();
    const scooterId = location.pathname.split("/").pop();

    const returnBike = async () => {
        try {
        const allBikes = await userToBikeModel.getAll();
        const allParkingZones = await zoneModel.getAllParkingZones();

        const userBike = allBikes.filter(bike => bike.scooterId === parseInt(scooterId));

        let totalCost = userBike[0].price;

        let returnPlaceCost = 0;
        // Iterate over all parking zones
        for (const zone of allParkingZones) {
            // Parse the WKT geometry string
            const geometry = wellknown.parse(zone.coordinates);

            // Extract coordinates from the parsed geometry
            const polygonCoordinates = geometry.coordinates[0].map(coord => [coord[0], coord[1]]);

            console.log(polygonCoordinates);
            const polygon = turf.polygon([polygonCoordinates]);

            // Create a point feature for the bike location
            const point = turf.point([bikeLocation.lat, bikeLocation.lng]);

            // Check if the point is inside the polygon
            const isInsidePolygon = turf.booleanPointInPolygon(point, polygon);

            if (isInsidePolygon) {
                console.log(`The bike is inside the polygon of Zone ${zone.zoneId}.`);
                returnPlaceCost = 5;
                console.log(returnPlaceCost);
                totalCost = totalCost - returnPlaceCost;
                console.log(totalCost);
                await userModel.addMoney(localStorage.userId, returnPlaceCost);
            } else {
                console.log(`The bike is outside the polygon of Zone ${zone.zoneId}.`);
                returnPlaceCost = 10;
                console.log(returnPlaceCost);
                totalCost = totalCost + returnPlaceCost;
                await userModel.removeMoney(localStorage.userId, returnPlaceCost);
            }
        }

        const timeNow = new Date();
        const returnTime = new Date(userBike[0].stopTime);
        const correctlyReturned = timeNow < returnTime;
        const timeDiff = ((timeNow.getTime() - returnTime.getTime()) / (1000 * 60));

        // For every extra minute you rent it over the time,
        // the user has to pay 20 + 3/min
        const startPrice = 20;
        const extraPrice = parseInt(startPrice + (timeDiff * 3));
        const returnMoney = parseInt(-timeDiff * 2);

        const scooterData = await bikeModel.getBike(scooterId);
        const startTime = new Date(userBike[0].startTime);
        const timeDiffFromStart = ((timeNow.getTime() - startTime.getTime()) / (1000 * 60));

        // 1 % battery = 6 minutes
        // Calculate amount of rented time, for every 6 minutes rented, reduce 1 % battery
        const batteryDrain = (scooterData.battery * 6) - timeDiffFromStart;
        let batteryDrainInPerc = parseInt(batteryDrain / 6);
        if (batteryDrainInPerc < 0) {
            batteryDrainInPerc = 0;
        }
        let id = await cityModel.getCity(city);
        if (id) {
            /**
            * Om användaren returnerar EFTER hyrtiden, så måste användaren betala mer
            */
            if (correctlyReturned === false) {
                totalCost = totalCost + extraPrice;
                await userModel.removeMoney(localStorage.userId, extraPrice);
            }
            
            /**
             * If user returns it earlier than 1 minute before rent time ends, user gets money back
             * Om användaren returnerar sparkcykeln tidigare än 1
             * 2/min
             */
            if (timeDiff < -1) {
                totalCost = totalCost - returnMoney;
                await userModel.addMoney(localStorage.userId, returnMoney);
            }
            const returnedBike = {
                scooterId: scooterId,
                lon: bikeLocation.lng,
                lat: bikeLocation.lat,
                battery: batteryDrainInPerc,
                status: "available",
            };
            
            const logData = {
                user_userid: localStorage.userId,
                scooterId: scooterId,
                startTime: userBike[0].startTime,
                stopTime: userBike[0].stopTime,
                returnTime: timeNow.toLocaleString("sv-SE"),
                price: userBike[0].price,
                totalPrice: totalCost,
            };
            await bikeModel.returnBike(returnedBike);
            await userToBikeModel.delete(userBike[0].idUsertobike);
            await logModel.create(logData);
            document.getElementById("map");
        }
        } catch (error) {
            console.log("Error in returnBike: ", error);
        }
    };

    function ClickHandler() {
        const map = useMap();
        const marker = useRef(null);

        useEffect(() => {
            const handleClick = async (e) => {
                const { lat, lng } = e.latlng;
                if (marker.current) {
                    marker.current.remove();
                }
                marker.current = L.marker([lat, lng], {
                    icon: icons.createIcon,
                }).addTo(map);
                bikeLocation.lat = lat;
                bikeLocation.lng = lng;
                city = await bikeModel.getBikeCity(lat, lng);
            };

            map.on("click", handleClick);

            return () => {
                map.off("click", handleClick);
            };
        }, [map]);

        return null;
    }
    const [currentLocation, setCurrentLocation] = useState({
        lat: 59,
        lng: 16,
    });

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const newPos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                setCurrentLocation(newPos);
            },
            () => {
                console.log("Unable to retrieve your location");
            }
        );
    }, []);

    return (
        <div className="flex flex-col items-center gap-5">
                <MapContainer
                    center={currentLocation}
                    zoom={13}
                    scrollWheelZoom={true}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <ZoneMarker />
                    <BikeMarker />
                    <ClickHandler />
                    <MoveToUser />
                </MapContainer>
            <button
                className="w-4/6 rounded bg-indigo-600 hover:bg-indigo-700 text-white text-lg p-3 shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
                onClick={() => returnBike()}
            >
                Return bike
            </button>
        </div>
    );
};

export default MarkLocationMap;
