const db = require("../databases/sql/database.js");

/**
 * A model representing user-related operations with the database.
 * @namespace
 */
const userModel = {
    /**
     * Retrieves all users from the database and returns them in a JSON format.
     * @param {Object} res - The response object used to send the JSON data.
     * @returns {Object} An array of user objects.
     */
    getAll: function (res) {
        db.all('SELECT * FROM Users', function (error, results, fields) {
            if (error) throw error;
            return res.json(results);
        });
    },
    /**
     * Retrieves a single user from the database based on the provided ID and sends the user data as a JSON response.
     * @param {number} id - The ID of the user to retrieve.
     * @param {object} res - The Express response object.
     * @returns {object} The user data as a JSON response.
     */
    getOne: function (id, res) {
        db.get('SELECT * FROM Users WHERE userId = ?', id, function (error, results, fields) {
            if (error) throw error;
            return res.json(results);
        });
    },

    /**
     * A function that verifies the password.
     * @param {string} passwd - The password to be verified.
     * @param {string} username - The username of the user.
     * @param {object} res - The response object.
     * @returns {object} The JSON representation of the results.
     */

    passVerif: function (username, passwd, res) {

        db.get(
            'SELECT * FROM Users WHERE (username = ? AND passwd = ?) OR (username = ? AND user_authid = ?)',
            [username, passwd, username, passwd],  // Assuming passwd is the password and usercredentials is the user credentials
            function (error, results) {
                if (error) {
                    throw error;
                }
                return res.json(results);
            }
        );
    },

    /**
     * Creates a new user in the database.
     * @param {Object} user - The user object containing username, email, and passwd.
     * @param {Object} res - The response object to send the result back to the client.
     * @returns {Object} - The result of the operation.
     */
    create: function (user, res) {
        const sql = 'INSERT INTO Users (username, email, passwd) VALUES (?, ?, ?)';
        const params = [user.body.username, user.body.email, user.body.passwd];

        db.run(sql, params, function (error) {
            if (error) {
                console.error('Error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            res.status(201).json({ message: 'User created successfully', userId: this.lastID });
        });
    },
    /**
     * Updates a user in the database based on the provided data.
     * @param {number} userId - The ID of the user to update.
     * @param {object} req - The request object containing the updated user data.
     * @param {object} res - The response object.
     * @returns {error} - If an error occurs during the update.
     */
    update: function (userId, req, res) {
        const sql = 'UPDATE Users SET ' +
            'username = COALESCE(?, username), ' +
            'email = COALESCE(?, email), ' +
            'passwd = COALESCE(?, passwd), ' +
            'userrole = COALESCE(?, userrole) ' +
            'WHERE userId = ?';

        const params = [
            req.username || null,
            req.email || null,
            req.passwd || null,
            req.userrole || null,
            userId
        ];
        console.log(params);
        console.log(params);
        db.run(sql, params, function (error, results) {
            if (error) {
                console.error('Error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
                return error;
            }
            console.log('User updated successfully.');
            res.status(201).json({ message: 'User updated successfully' });
        });
    },
    /**
     * Deletes a user from the database.
     * @param {number} id - The ID of the user to delete.
     * @param {object} res - The response object.
     * @returns {object} - The JSON response containing the result of the deletion.
     */
    delete: function (id, res) {
        const sql = 'DELETE FROM Users WHERE userId = ?';
        db.run(sql, id, function (error, results) {
            if (error) {
                console.error('Error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            res.json({ message: 'User deleted successfully' });
        });
    },

    /**
     * Adds money to the user's balance in the database.
     * @param {number} userId - The ID of the user to whom money will be added.
     * @param {number} amount - The amount of money to be added to the user's balance.
     * @param {object} res - The Express response object to send the result back to the client.
     */
    addMoney: function (userId, amount, res) {
        const sql = 'UPDATE Users SET user_balance = COALESCE(user_balance, 0) + ? WHERE userId = ?';
        const params = [amount, userId];

        db.run(sql, params, function (error) {
            if (error) {
                console.error('Error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            console.log('Money added successfully.');
            res.json({ message: 'Money added successfully' });
        });
    },

    /**
     * Deducts money from the user's balance in the database.
     * @param {number} userId - The ID of the user from whom money will be deducted.
     * @param {number} amount - The amount of money to be deducted from the user's balance.
     * @param {object} res - The Express response object to send the result back to the client.
     */
    removeMoney: function (userId, amount, res) {
        const sql = 'UPDATE Users SET user_balance = COALESCE(user_balance, 0) - ? WHERE userId = ?';
        const params = [amount, userId];

        db.run(sql, params, function (error) {
            if (error) {
                console.error('Error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            console.log('Money deducted successfully.');
            res.json({ message: 'Money deducted successfully' });
        });
    },
    /**
 * Deducts money from the user's balance in the database.
 * @param {number} userId - The ID of the user from whom money will be deducted.
 * @param {number} amount - The amount of money to be deducted from the user's balance.
 * @param {object} res - The Express response object to send the result back to the client.
 */
    removeMoney: function (userId, amount, res) {
        const sql = 'UPDATE Users SET user_balance = COALESCE(user_balance, 0) - ? WHERE userId = ?';
        const params = [amount, userId];

        db.run(sql, params, function (error) {
            if (error) {
                console.error('Error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            console.log('Money deducted successfully.');
            res.json({ message: 'Money deducted successfully' });
        });
    }
};

module.exports = userModel;