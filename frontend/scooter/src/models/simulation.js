import url from "./getUrl";

const userSimulationModel = {
    // getUsers: async function () {
    //     try {
    //         const response = await fetch('http://localhost:1337/user');
    //         const data = await response.json();
    //     } catch (error) {
    //         console.error(error);
    //     }
    // },
    createUser: async function (userName, email, passwd) {
        const path = url.getUrl();

        fetch(`${path}/v1/user`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'API-KEY': 'BOI-API-KEY' },
            body: JSON.stringify({
                username: userName,
                email: email,
                passwd: passwd
            })
        })
            .then(response => response.json())
            .catch(error => console.error(error));
    },
    updateMultipleBikes: async function (scooters) {
        const path = url.getUrl();

        fetch(`${path}/v1/scooter`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'API-KEY': 'BOI-API-KEY' },
            body: JSON.stringify(scooters)
        })
            .then(response => response.json())
            .catch(error => console.error(error));
    }
};

// module.exports = userSimulationModel;
export default userSimulationModel;