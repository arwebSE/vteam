import urlModel from "./getUrl";

const cityModel = {
    // Get with name of city or city id
    getCity: async function (city) {
        try {
            const path = urlModel.getUrl();
            const url = `${path}/v1/city/${city}`;
            const response = await fetch(url, {
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

    getCities: async function () {
        try {
            const path = urlModel.getUrl();

            const response = await fetch(`${path}/v1/city`, {
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
}

export default cityModel;
