import url from "./getUrl";

const bikeModel = {
    getBikes: async function () {
        try {
            const path = url.getUrl();
            const response = await fetch(`${path}/v1/scooter`, {
                headers: {
                    'API-KEY': 'BOI-API-KEY'
                }
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    },

    getAllAvailable: async function () {
        try {
            const path = url.getUrl();
            const response = await fetch(`${path}/v1/scooter/available`, {
                headers: {
                    'API-KEY': 'BOI-API-KEY'
                }
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    },
    getLowBatteryBikes: async function () {
        try {
            const path = url.getUrl();
            const response = await fetch(`${path}/v1/scooter/lowbattery`, {
                headers: {
                    'API-KEY': 'BOI-API-KEY'
                }
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    },

    getBike: async function (id) {
        try {
            const path = url.getUrl();
            const response = await fetch(`${path}/v1/scooter/${id}`, {
                headers: {
                    'API-KEY': 'BOI-API-KEY'
                }
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    },

    getBikeCity: async function (lat, lng) {
        try {

            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
            const data = await response.json();
            if (data.address.city === undefined) {
                console.log("data.address.city is undefined", data.address.municipality);
                return data.address.municipality;
            }
            return data.address.city;
        } catch (error) {
            console.error(error);
        }
    },

    createBike: async function (bike) {
        try {
            const path = url.getUrl();

            const response = await fetch(`${path}/v1/scooter`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'API-KEY': 'BOI-API-KEY'
                },
                body: JSON.stringify({
                    lon: bike.lon,
                    lat: bike.lat,
                    battery: bike.battery,
                    status: bike.status,
                    city_cityid: bike.city_cityid
                })
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    },
    getBikeIdsFromCity: async function (city) {
        try {
            const path = url.getUrl();

            const response = await fetch(`${path}/v1/scooter/ids/${city}`, {
                headers: {
                    'API-KEY': 'BOI-API-KEY'
                }
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    },
    editUser: async function (scooterId, lon, lat, battery, status, city, speed = 0) {
        try {
            const path = url.getUrl();
            const response = await fetch(`${path}/v1/scooter/${scooterId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'API-KEY': 'BOI-API-KEY'
                },
                body: JSON.stringify({
                    lon: lon,
                    lat: lat,
                    battery: battery,
                    status: status,
                    city_cityid: city,
                    speed: speed,
                })
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    },
    getBikesFromCity: async function (city) {
        try {
            const path = url.getUrl();

            const response = await fetch(`${path}/v1/scooter/city/${city}`, {
                headers: {
                    'API-KEY': 'BOI-API-KEY'
                }
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    },
    deleteAllBikes: async function () {
        try {
            const path = url.getUrl();
            const response = await fetch(`${path}/v1/scooter`, {
                headers: { 'API-KEY': 'BOI-API-KEY' },
                method: 'DELETE'
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    },
    rentBike: async function (scooterId) {
        try {
            const path = url.getUrl();

            const response = await fetch(`${path}/v1/scooter/${scooterId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'API-KEY': 'BOI-API-KEY'
                },
                body: JSON.stringify({
                    status: 'Rented'
                })
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    },

    returnBike: async function (bike) {
        try {
            const path = url.getUrl();

            const response = await fetch(`${path}/v1/scooter/${bike.scooterId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'API-KEY': 'BOI-API-KEY'
                },
                body: JSON.stringify({
                    lon: bike.lon,
                    lat: bike.lat,
                    battery: bike.battery,
                    status: bike.status
                })
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    }
}

export default bikeModel;
