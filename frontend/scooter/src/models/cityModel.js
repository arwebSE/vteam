const cityModel = {
    // Get with name of city or city id
    getCity: async function (city) {
        try {
            const url = 'http://localhost:1337/v1/city/' + city;
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
            const response = await fetch('http://localhost:1337/v1/city', {
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
