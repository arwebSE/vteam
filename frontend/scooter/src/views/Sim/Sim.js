import "./style.css";
import boi from "../../boi.png";
import BikeMap from "../../components/BikeMap";
import simModel from '../../models/simulation';
import bikeModel from "../../models/bikeModel";
import cityModel from "../../models/cityModel";
import zoneModel from "../../models/zoneModel";
import wellknown from 'wellknown';
import { useState, useEffect } from "react";
import * as turf from '@turf/turf';
import { RotatingLines } from 'react-loader-spinner';

// Mycket av denna komponent bygger på Turf.js
// Dokumentationen för Turf.js finns här:
// https://turfjs.org/

// Denna komponent är en simulering av hur cyklarna rör sig i städerna

const names = require('../../data/names.json');

function Sim() {

    const [isLoading, setIsLoading] = useState(false);
    const [loadingTxt, setLoadingTxt] = useState("Creating users...");
    const [cities, setCities] = useState({});
    const [nogoZones, setNogoZones] = useState({});
    const [goals, setGoals] = useState({});
    const [sliderValue, setSliderValue] = useState(1);
    const [update, setUpdate] = useState(false);

    async function createUsers() {
        setLoadingTxt("Creating users...");

        const startTime = new Date();

        for (let i = 0; i < sliderValue; i++) {
            let randomFirst = Math.random() * (names.firstName.length - 1) + 1;
            let randomLast = Math.random() * (names.lastName.length - 1) + 1;
            let userName = names.firstName[parseInt(randomFirst)] + "." + names.lastName[parseInt(randomLast)];
            let email = names.firstName[parseInt(randomFirst)] + "." + names.lastName[parseInt(randomLast)] + "@example.com";
            await simModel.createUser(userName, email, "password");
        }

        const endTime = new Date();
        const duration = (endTime - startTime) / 1000;
        console.log(`Created ${sliderValue} users in ${duration} seconds`);
    }


    async function getSpawnZones(cities) {
        let names = cities.map(city => city.id);
        let spawn = {};


        for (let i = 0; i < names.length; i++) {
            let cityZones = await zoneModel.getCityZoneFromCity(names[i]);

            let cityPolygons = [];
            cityZones.forEach(cityZone => {
                if (cityZone.coordinates !== "POLYGON(())") {
                    let cityGeojson = wellknown.parse(cityZone.coordinates);
                    let cityReversedCoordinates = cityGeojson.coordinates[0].map(coord => coord.reverse());
                    let cityPolygon = turf.polygon([cityReversedCoordinates], { name: cityZone.zonetype });
                    cityPolygons.push(cityPolygon);
                }
            });
            spawn[names[i]] = cityPolygons;
        }

        return spawn;
    }

    async function getNogoZones(cities) {
        let names = cities.map(city => city.id);
        let noSpawn = {};
        for (let i = 0; i < names.length; i++) {
            let noGoZones = await zoneModel.getNogoFromCity(names[i]);
            let noGoPolygons = [];
            noGoZones.forEach(noGoZone => {
                if (noGoZone.coordinates !== "POLYGON(())") {
                    let noGoGeojson = wellknown.parse(noGoZone.coordinates);
                    let noGoReversedCoordinates = noGoGeojson.coordinates[0].map(coord => coord.reverse());
                    let noGoPolygon = turf.polygon([noGoReversedCoordinates], { name: noGoZone.zonetype });
                    noGoPolygons.push(noGoPolygon);
                }
            });
            noSpawn[names[i]] = noGoPolygons;
        }
        return noSpawn;
    }


    async function createBikesAndGoals(cities, zones, noGoZones) {
        setLoadingTxt("Creating bikes and goals...");

        // Variabler för att hålla cyklarna och målen
        let ids = {};
        let goals = {};
        cities.map(city => ids[city.id] = city.cityId);
        cities.forEach(cities => {
            goals[cities.id] = [];
        });
        let updatedGoals = { ...goals }; // Skapar en kopia av goals
        let bikesEach = sliderValue;

        // Alla städer får endast ha en cityzone
        for (let key in zones) {
            // Skapar antalet cyklar från slidervärdet
            for (let k = 0; k < bikesEach; k++) {
                // Skapar ett mål och en cykel och lagrar de i respektive array
                for (let y = 0; y < 2; y++) {
                    // Kontrollerar att cykeln inte hamnar i en no-go zone
                    for (let z = 0; z < zones[key].length; z++) {
                        let cityZonePolygon = zones[key][z];
                        let noGoPolygons = noGoZones[key];

                        let bounds = turf.bbox(cityZonePolygon);
                        let east = bounds[2];
                        let west = bounds[0];
                        let north = bounds[3];
                        let south = bounds[1];

                        let lat, lon, point, insideCity, insideNoGo;
                        // Genererar en punkt som är inuti staden
                        do {
                            lon = Math.random() * (east - west) + west;
                            lat = Math.random() * (north - south) + south;

                            point = turf.point([lon, lat]);
                            // Kontrollerar att punkten är i staden
                            insideCity = turf.booleanPointInPolygon(point, cityZonePolygon);
                            insideNoGo = false;

                            // Kontrollerar att punkten är i en no-go zone
                            for (let i = 0; i < noGoPolygons.length; i++) {
                                if (turf.booleanPointInPolygon(point, noGoPolygons[i])) {
                                    insideNoGo = true;
                                    break;
                                }
                            }
                        } while (insideNoGo || !insideCity);
                        if (y === 1) {
                            // Sparar målet i en array
                            updatedGoals[key].push([lon, lat]);
                        } else {
                            // Sparar cykeln i databasen
                            let bikeData = {
                                "lat": lat,
                                "lon": lon,
                                "status": "Available",
                                "battery": 100,
                                "city_cityid": ids[key],
                                "speed": 0,
                            };
                            // Lägger till cyklar i databasen
                            await bikeModel.createBike(bikeData);
                        }

                    }
                }
            }
        }
        setGoals(updatedGoals);
    }



    async function handleSubmit(e) {

        e.preventDefault();
        let cities = await cityModel.getCities();
        console.log(cities)
        let zones = await getSpawnZones(cities);
        let noGoZones = await getNogoZones(cities);
        setNogoZones(noGoZones);
        setCities(cities);
        setIsLoading(true);
        await createUsers();
        await createBikesAndGoals(cities, zones, noGoZones);
        // Startar nedräkningen
        let countdown = 3;
        const countdownInterval = setInterval(() => {
            setLoadingTxt(`Starting simulation\n ${countdown} seconds...`);
            countdown--;
            if (countdown < 0) {
                clearInterval(countdownInterval);
                setUpdate(true);
                setIsLoading(false);
            }
        }, 1000);
    };

    function insideNogoZone(Lat, Lon, nogoZones) {
        if (nogoZones.length === 0) {
            return false;
        }

        for (let i = 0; i < nogoZones.length; i++) {
            let noGoZone = nogoZones[i];
            let noGoGeojson = wellknown.parse(noGoZone.coordinates);
            let noGoReversedCoordinates = noGoGeojson.coordinates[0].map(coord => coord.reverse());
            let noGoPolygon = turf.polygon([noGoReversedCoordinates], { name: noGoZone.zonetype });
            let point = turf.point([Lon, Lat]);

            if (turf.booleanPointInPolygon(point, noGoPolygon)) {
                return true;
            }
        }

        return false;
    }

    function insideCity(Lat, Lon, cityZones) {
        for (let i = 0; i < cityZones.length; i++) {
            let cityZone = cityZones[i];
            let cityGeojson = wellknown.parse(cityZone.coordinates);
            let cityReversedCoordinates = cityGeojson.coordinates[0].map(coord => coord.reverse());
            let cityPolygon = turf.polygon([cityReversedCoordinates], { name: cityZone.zonetype });
            let point = turf.point([Lon, Lat]);

            if (turf.booleanPointInPolygon(point, cityPolygon)) {
                return true;
            }
        }

        return false;
    }


    function insideRestrictedZone(Lat, Lon, restrictedZones) {
        for (let i = 0; i < restrictedZones.length; i++) {
            let restrictedZone = restrictedZones[i];
            let restrictedGeojson = wellknown.parse(restrictedZone.coordinates);
            let restrictedReversedCoordinates = restrictedGeojson.coordinates[0].map(coord => coord.reverse());
            let restrictedPolygon = turf.polygon([restrictedReversedCoordinates], { name: restrictedZone.zonetype });
            let point = turf.point([Lon, Lat]);

            if (turf.booleanPointInPolygon(point, restrictedPolygon)) {
                return true;
            }
        }

        return false;
    }

    useEffect(() => {
        if (update) {
            const cities = Object.keys(goals);
            const updateInterval = 5000; // Sekunder
            setInterval(async () => {
                for (const city of cities) {
                    let update = [];
                    let bikes = await bikeModel.getBikesFromCity(city);
                    let cityNogo = await zoneModel.getNogoFromCity(city);
                    let cityZone = await zoneModel.getCityZoneFromCity(city);
                    let cityRestricted = await zoneModel.getRestrictedFromCity(city);

                    for (let i = 0; i < bikes.length; i++) {
                        const currentLocation = [bikes[i].lat, bikes[i].lon];
                        const targetLocation = [goals[city][i][1], goals[city][i][0]];
                        let speedKmPerHour;
                        let status;
                        let consumption = 1;
                        let charge = bikes[i].battery;

                        if (bikes[i].speed === null) {
                            speedKmPerHour = 20;
                        }
                        // Kolla batteriet
                        if (charge <= 0) {
                            charge = 0
                            speedKmPerHour = 0;
                            status = "service"
                        } else {
                            // Kolla om vi cyklen nått målet
                            if (turf.distance(turf.point(currentLocation), turf.point(targetLocation)) < 0.0001) {
                                consumption = 0;
                                speedKmPerHour = 0;
                                status = "Goal Reached";
                            } else {
                                // Kolla om vi är i en no-go zone
                                if (insideNogoZone(currentLocation[0], currentLocation[1], cityNogo)) {
                                    consumption = 0;
                                    speedKmPerHour = 0;
                                    status = "service";
                                } else {
                                    // Dessa får cykeln röra sig i
                                    if (insideRestrictedZone(currentLocation[0], currentLocation[1], cityRestricted)) {
                                        status = "unavailable";
                                        speedKmPerHour = 10;
                                    } else if (insideCity(currentLocation[0], currentLocation[1], cityZone)) {
                                        speedKmPerHour = 20;
                                        status = "unavailable";
                                    } else {
                                        speedKmPerHour = 0;
                                        status = "service";
                                    }
                                    charge = bikes[i].battery - consumption;
                                }
                            }
                        }

                        // Distansen beräknas
                        // Avståndet kan beräknas med hjälp av hastigheten och tiden
                        // Räknas ut med mps * tid = meter
                        const dist = (updateInterval / 1000) * ((speedKmPerHour / 3.6) / 1000);
                        // Nya positionen beräknas med turf genom att flytta en punkt längs en linje med avståndet
                        const newLocation = turf.along(turf.lineString([currentLocation, targetLocation]), dist);

                        // Uppdaterar positionen
                        bikes[i].lon = newLocation.geometry.coordinates[1];
                        bikes[i].lat = newLocation.geometry.coordinates[0];
                        // Sparar data i en array
                        update.push({
                            "scooterId": bikes[i].scooterId,
                            "lat": bikes[i].lat,
                            "lon": bikes[i].lon,
                            "battery": charge,
                            "status": status,
                            "city_cityid": bikes[i].city_cityid,
                            "speed": speedKmPerHour
                        });

                    }
                    // Uppdaterar alla cyklar med en request
                    await simModel.updateMultipleBikes(update);
                }
            }, updateInterval);
        }
    }, [update, goals, cities, nogoZones]);







    return (

        <div className="flex flex-col justify-center w-full pt-9 mt-9">
            <div className="flex flex-row items-center justify-center">
                <h1 className="text-4xl pl-10 text-center font-bold text-gray-900 mb-6">Scooter Simulator</h1>
                <img src={boi} alt="boi" className="scooter mx-auto h-16 md:h-20 lg:h-24 w-auto mb-6" />
            </div>
            <div className="flex w-full p-3 flex-col items-center justify-center">
                {/* <User /> */}
                <BikeMap goals={goals} />
                {isLoading && (
                    <div className="progress-bar-container">
                        <RotatingLines
                            visible={true}
                            height="96"
                            width="96"
                            color="grey"
                            strokeWidth="5"
                            animationDuration="0.75"
                            ariaLabel="rotating-lines-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                        />
                        <h1 className="text-2xl text-white text-center font-bold text-gray-900 mb-6">{loadingTxt}</h1>
                    </div>
                )}
                <form className="flex flex-col bg-slate-200 w-11/12 items-center rounded m-4" onSubmit={handleSubmit}>
                    <label
                        className="mb-2"
                        htmlFor="quantity">
                        Number of Bikes in each city: {sliderValue}
                    </label>
                    <label className="font-bold">
                        Total bikes {sliderValue * 3}
                    </label>
                    <input
                        className="w-1/2 h-10"
                        type="range"
                        id="quantity"
                        name="quantity"
                        min="1"
                        step="10"
                        max="650"
                        defaultValue="1"
                        onChange={(e) => setSliderValue(e.target.value)}>
                    </input>
                    <button className="p-1.5 rounded bg-gray-800 text-white text-center">Start Simulation</button>
                </form>
            </div>
        </div>

    );


}

export default Sim;
