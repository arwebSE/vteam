import url from "./getUrl";

const userToBikeModel = {
    getAll: async function () {
        try {
            const path = url.getUrl();

            const response = await fetch(`${path}/v1/userToBike`, {
                headers: {
                    'API-KEY': 'BOI-API-KEY'
                }
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching all user-to-bike relationships:', error);
        }
    },

    create: async function (usertoBike) {
        try {
            const path = url.getUrl();

            console.log(usertoBike);
            const response = await fetch(`${path}/v1/userToBike`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'API-KEY': 'BOI-API-KEY'
                },
                body: JSON.stringify({
                    user_userid: usertoBike.user_userid,
                    scooterId: usertoBike.scooterId,
                    startTime: usertoBike.startTime,
                    stopTime: usertoBike.stopTime,
                    price: usertoBike.price,
                }),
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    },

    delete: async function (idUsertobike) {
        try {
            const path = url.getUrl();

            const response = await fetch(`${path}/v1/userToBike/${idUsertobike}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'API-KEY': 'BOI-API-KEY'
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error:', errorData);
                return { error: 'Internal Server Error' };
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            return { error: 'Internal Server Error' };
        }
    },
};

export default userToBikeModel;
