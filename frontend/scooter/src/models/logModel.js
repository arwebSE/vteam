import url from './getUrl.js';

const logModel = {
    getAll: async function () {
        try {
            const path = url.getUrl();

            const response = await fetch(`${path}/v1/log`, {
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

    getOneUserLogs: async function (userId) {
        try {
            const path = url.getUrl();
            const response = await fetch(`${path}/v1/log/${userId}`, {
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

    create: async function (log) {
        const jsonData = {
            user_userid: log.user_userid,
            scooterId: log.scooterId,
            startTime: log.startTime,
            stopTime: log.stopTime,
            returnTime: log.returnTime,
            price: log.price,
            totalPrice: log.totalPrice,
        };
        console.log(log);
        try {
            const path = url.getUrl();

            const response = await fetch(`${path}/v1/log`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'API-KEY': 'BOI-API-KEY'
                },
                body: JSON.stringify(jsonData)
            });

            const data = await response.json();
            console.log('Success:', data);
            return data;
        } catch (error) {
            console.error('Error:', error);
        }
    },

    update: async function (logId, log) {
        try {
            const path = url.getUrl();
            const response = await fetch(`${path}/v1/log/${logId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'API-KEY': 'BOI-API-KEY'
                },
                body: JSON.stringify({
                    user_userid: log.user_userid,
                    scooterId: log.scooterId,
                    startTime: log.startTime,
                    stopTime: log.stopTime,
                    returnTime: log.returnTime,
                    price: log.price,
                    totalPrice: log.totalPrice,
                    returned: log.returned,
                })
            });

            const data = await response.json();
            console.log('Success:', data);
            return data;
        } catch (error) {
            console.error('Error:', error);
        }
    },

    returnBikeLogUpdate: async function (logId, log) {
        try {
            const path = url.getUrl();

            const response = await fetch(`${path}/v1/log/${logId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'API-KEY': 'BOI-API-KEY'
                },
                body: JSON.stringify({
                    returnTime: log.returnTime,
                    totalPrice: log.totalPrice,
                    returned: log.returned,
                })
            });

            const data = await response.json();
            console.log('Success:', data);
            return data;
        } catch (error) {
            console.error('Error:', error);
        }
    },

    delete: async function (logId) {
        try {
            const path = url.getUrl();

            const response = await fetch(`${path}/v1/log/${logId}`, {
                method: 'DELETE',
                headers: {
                    'API-KEY': 'BOI-API-KEY'
                }
            });

            const data = await response.json();
            console.log('Success:', data);
            return data;
        } catch (error) {
            console.error('Error:', error);
        }
    }
};

export default logModel;
