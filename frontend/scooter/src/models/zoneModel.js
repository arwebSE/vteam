import url from "./getUrl";
const zoneModel = {
    // Get zone fetch request
    getZones: async function getZones() {
        try {
            const path = url.getUrl();

            const response = await fetch(`${path}/v1/zone`, {
                headers: {
                    'API-KEY': 'BOI-API-KEY'
                }
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching zone:', error);
            throw error;
        }
    },
    // Get zone fetch request
    getZone: async function getZone(zoneId) {
        try {
            const path = url.getUrl();

            const response = await fetch(`${path}/v1/zone/${zoneId}`, {
                headers: {
                    'API-KEY': 'BOI-API-KEY'
                }
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching zone:', error);
            throw error;
        }
    },
    // Put zone fetch request
    createZone: async function createZone(zoneData) {
        try {
            const path = url.getUrl();

            const response = await fetch(`${path}/v1/zone`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'API-KEY': 'BOI-API-KEY'
                },
                body: JSON.stringify(zoneData),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error updating zone:', error);
            throw error;
        }
    },
    getNogoFromCity: async function getNogoFromCity(city) {
        try {
            const path = url.getUrl();

            const response = await fetch(`${path}/v1/zone/nogo/${city}`, {
                headers: {
                    'API-KEY': 'BOI-API-KEY'
                }
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching nogo:', error);
            throw error;
        }
    },
    getCityZoneFromCity: async function getCityZoneFromCity(city) {
        try {
            const path = url.getUrl();

            const response = await fetch(`${path}/v1/zone/city/${city}`, {
                headers: {
                    'API-KEY': 'BOI-API-KEY'
                }
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching cityzone:', error);
            throw error;
        }
    },
    getRestrictedFromCity: async function getRestrictedFromCity(city) {
        try {
            const path = url.getUrl();
            const response = await fetch(`${path}/v1/zone/restricted/${city}`, {
                headers: {
                    'API-KEY': 'BOI-API-KEY'
                }
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching restricted:', error);
            throw error;
        }
    },
    getAllParkingZones: async function getAllParkingZones() {
        try {
            const path = url.getUrl();

            const response = await fetch(`${path}/v1/zone/parkings`, {
                headers: {
                    'API-KEY': 'BOI-API-KEY'
                }
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching restricted:', error);
            throw error;
        }
    }
};

export default zoneModel;
