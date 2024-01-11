const userModel = {
    /**
     * Fetches all users from the API
     * @returns {Promise<Array>} Array of user objects
     */
    getUsers: async function() {
        try {
            const response = await fetch('http://localhost:1337/v1/user', {
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

    /**
     * Fetches a specific user from the API based on the provided id
     * @param {number} id - The id of the user to fetch
     * @returns {Promise<Object>} User object
     */
    getUser: async function(id) {
        try {
            const response = await fetch(`http://localhost:1337/v1/user/${id}`, {
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

    /**
     * Asynchronously verifies the given ID and password by making a request to the server.
     * @param {string} username - The username to be verified.
     * @param {string} passwd - The password to be verified.
     * @returns {Promise<any>} - A Promise that resolves to the data received from the server.
     */
    passVerif: async function(username, passwd) {
        try {
            const response = await fetch(`http://localhost:1337/v1/user/ver/${username}/${passwd}`, {
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

    /**
     * Creates a new user in the API
     * @param {string} username - The username of the new user
     * @param {string} email - The email of the new user
     * @param {string} password - The password of the new user
     */
    createUser: async function(username, email, password) {
        const userrole = "user"
        const jsonData = {
            username: username,
            email: email,
            passwd: password,
            userrole: userrole,
            authprov: userrole
        };

        try {
            const response = await fetch('http://localhost:1337/v1/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set content type to JSON
                    'API-KEY': 'BOI-API-KEY'
                },
                body: JSON.stringify(jsonData)
            });

            const data = await response.json();
            console.log('Success:', data);
            // Handle success, e.g., show a success message to the user
        } catch (error) {
            console.error('Error:', error);
            // Handle errors, e.g., show an error message to the user
        }
    },

    /**
     * Edits a user in the API based on the provided id
     * @param {number} id - The id of the user to edit
     * @param {string} username - The new username of the user
     * @param {string} email - The new email of the user
     * @param {string} passwd - The new password of the user
     * @param {string} userRole - The new role of the user
     * @returns {Promise<Object>} Updated user object
     */
    editUser: async function(id, username, email, passwd, userRole) {
        try {
            const response = await fetch(`http://localhost:1337/v1/user/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'API-KEY': 'BOI-API-KEY'
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    passwd: passwd,
                    userrole: userRole
                })
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    },

    /**
     * Adds money to the user's balance in the database.
     * @param {number} id - The ID of the user to whom money will be added.
     * @param {number} amount - The amount of money to be added to the user's balance.
     * @param {object} res - The Express response object to send the result back to the client.
     */
    addMoney: async function(id, amount) {
        try {
            const response = await fetch(`http://localhost:1337/v1/user/${id}/addMoney`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'API-KEY': 'BOI-API-KEY'
                },
                body: JSON.stringify({
                    amount: amount
                })
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    },

    /**
     * Deducts money from the user's balance in the database.
     * @param {number} id - The ID of the user from whom money will be deducted.
     * @param {number} amount - The amount of money to be deducted from the user's balance.
     */
    removeMoney: async function(id, amount) {
        try {
            const response = await fetch(`http://localhost:1337/v1/user/${id}/removeMoney`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'API-KEY': 'BOI-API-KEY'
                },
                body: JSON.stringify({
                    amount: amount
                })
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    },
}

export default userModel;