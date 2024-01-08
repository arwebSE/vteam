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
        fetch('http://localhost:1337/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
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
        fetch('http://localhost:1337/scooter', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(scooters)
        })
            .then(response => response.json())
            .catch(error => console.error(error));
    }
};

module.exports = userSimulationModel;