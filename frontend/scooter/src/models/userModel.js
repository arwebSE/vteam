const userModel = {
    /**
     * Fetches all users from the API
     * @returns {Promise<Array>} Array of user objects
     */
    getUsers: async function () {
        try {
            const response = await fetch('http://localhost:1337/user');
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
    getUser: async function (id) {
        try {
            const response = await fetch(`http://localhost:1337/user/${id}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    },

    /**
     * Asynchronously verifies the given ID and password by making a request to the server.
     * @param {string} id - The ID to be verified.
     * @param {string} passwd - The password to be verified.
     * @returns {Promise<any>} - A Promise that resolves to the data received from the server.
     */
    passverif: async function (id, passwd) {
        try {
            const response = await fetch(`http://localhost:1337/user/${id}/${passwd}`);
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
    createUser: async function (username, email, password) {
        const jsonData = {
            username: username,
            email: email,
            passwd: password,
            userrole: "user",
            authprov: "user"
        };
    
        // Send a POST request to the API endpoint
        await fetch('http://localhost:1337/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'  // Set content type to JSON
            },
            body: JSON.stringify(jsonData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Assuming the API returns JSON
        })
        .then(data => {
            console.log('Success:', data);
            // Handle success, e.g., show a success message to the user
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle errors, e.g., show an error message to the user
        });
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
    editUser: async function (id, username, email, passwd, userRole) {
        try {
            const response = await fetch(`http://localhost:1337/user/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
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
    }
}

export default userModel;