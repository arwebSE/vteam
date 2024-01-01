import "./style.css";
import boi from "../../boi.png";
import Bikes from "../../components/Simulation/Bikes";
import BikeMap from "../../components/BikeMap";
import simModel from '../../models/simulation';
import bikeModel from "../../models/bikeModel";
import cityModel from "../../models/cityModel";
import zoneModel from "../../models/zoneModel";
import wellknown from 'wellknown';
import { useState } from "react";
import * as turf from '@turf/turf';
const names = require('../../data/names.json');


// let sliderValue = 1;


function Sim() {
    const [sliderValue, setSliderValue] = useState(1);

    async function createUsers() {
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
        console.log(`Execution Users time: ${duration} seconds`);
    }

    //
    // Returns an array of polygons representing the spawn zones
    //
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


    async function createBikes() {
        let cities = await cityModel.getCities();
        let zones = await getSpawnZones(cities);
        let noGoZones = await getNogoZones(cities);
        console.log(noGoZones);
        console.log(zones);

        let bikesEach = 50;

        for (let key in zones) {
            for (let k = 0; k < bikesEach; k++) {
                for (let z = 0; z < zones[key].length; z++) {
                    let cityZonePolygon = zones[key][z];
                    let noGoPolygons = noGoZones[key]; // Assuming there can be multiple no-go polygons

                    let bounds = turf.bbox(cityZonePolygon);
                    let east = bounds[2];
                    let west = bounds[0];
                    let north = bounds[3];
                    let south = bounds[1];

                    let lat, lon, point, insideCity, insideNoGo;

                    do {
                        lon = Math.random() * (east - west) + west;
                        lat = Math.random() * (north - south) + south;

                        point = turf.point([lon, lat]);
                        insideCity = turf.booleanPointInPolygon(point, cityZonePolygon);
                        insideNoGo = false;

                        // Check if the point is inside any no-go zone
                        for (let i = 0; i < noGoPolygons.length; i++) {
                            if (turf.booleanPointInPolygon(point, noGoPolygons[i])) {
                                insideNoGo = true;
                                break;
                            }
                        }

                    } while (insideNoGo || !insideCity);

                    console.log(lat, lon);
                    let bikeData = {
                        "lat": lat,
                        "lon": lon,
                        "status": "Available",
                        "battery": 100,
                        "city_cityid": key
                    };

                    // Uncomment the following line when you're ready to create bikes
                    await bikeModel.createBike(bikeData);
                }
            }
        }
    }






    async function handleSubmit(e) {
        e.preventDefault();
        createUsers();
        createBikes();
        console.log(sliderValue);
    };
    return (
        <div className="p-9 m-9">
            <div className="flex flex-row items-center justify-center">
                <h1 className="text-4xl pl-10 text-center font-bold text-gray-900 mb-6">Scooter Simulator</h1>
                <img src={boi} alt="boi" className="scooter mx-auto h-16 md:h-20 lg:h-24 w-auto mb-6" />
            </div>
            <div className="flex p-3 flex-col items-center justify-center bg-stone-100">
                <BikeMap />
                <Bikes />
                {/* <User /> */}
                <form className="flex flex-col items-center" onSubmit={handleSubmit}>
                    <label htmlFor="quantity">Number of Bikes: {sliderValue}</label>
                    <input type="range" id="quantity" name="quantity" min="1" max="1000" defaultValue="1" onChange={(e) => setSliderValue(e.target.value)}></input>
                    <button className="p-1.5 rounded bg-gray-800 text-white text-center" onClick={handleSubmit}>Create Users</button>
                </form>
            </div>
        </div>
    );

}

export default Sim;
