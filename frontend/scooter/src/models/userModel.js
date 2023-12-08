const userModel = {
    getUsers: async function () {
        try {
            const response = await fetch('http://localhost:1337/user');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    },

    getUser: async function (id) {
        try {
            const response = await fetch(`http://localhost:1337/user/${id}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    },

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