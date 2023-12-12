const cityModel = {
    // Get with name of city or city id
    getCity: async function (city) {
        try {
            const url = 'http://localhost:1337/city/' + city;
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    }
}

export default cityModel;