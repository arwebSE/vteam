const userSimulationModel = {
    createUser: async function (userName, email, passwd) {
        try {
            const response = await fetch('http://localhost:1337/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'API-KEY': 'BOI-API-KEY'
                },
                body: JSON.stringify({
                    username: userName,
                    email: email,
                    passwd: passwd
                })
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    }
};

module.exports = userSimulationModel;
