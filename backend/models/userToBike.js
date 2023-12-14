const db = require('../databases/sql/database.js');

const usertoBikeModel = {
    /*
        Get all information in the UsertoBike table in database (All entries)
    */
    getAll: function (res) {
        db.all('SELECT * FROM UsertoBike', function (error, results, fields) {
            if (error) throw error;
            res.json(results);
        });
    },

    /*
        You can get all information about a specific UsertoBike entry with idUsertobike
        Example: 1 (if 1 is the idUsertobike in UsertoBike table in database)
    */
    getOne: function (idUsertobike, res) {
        const sql = 'SELECT * FROM UsertoBike WHERE idUsertobike = ?';
        db.get(sql, [idUsertobike], function (error, results, fields) {
            if (error) throw error;
            res.json(results);
        });
    },

    /*
        Create a new entry in the UsertoBike table with the specified values
        idUserToBike, startTime and price is auto generated.
    */
    create: function (usertoBike, res) {
        const dateNow = new Date();
        const dateStartTimeString = dateNow.toLocaleString("sv-SE");

        const dateStopTime = new Date(usertoBike.stopTime);
        const dateStopTimeString = dateStopTime.toLocaleString("sv-SE");

        const startPrice = 10;
        const timeBetweenMinutes = ((dateStopTime - dateNow) / 1000) / 60;
        const price = parseInt(startPrice + (timeBetweenMinutes * 2));

        const sql = 'INSERT INTO UsertoBike (user_userid, scooterId, startTime, stopTime, price) VALUES (?, ?, ?, ?, ?)';
        const params = [usertoBike.user_userid, usertoBike.scooterId, dateStartTimeString, dateStopTimeString, price];

        db.run(sql, params, function (error) {
            if (error) {
                console.error('Error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            res.status(201).json({ message: 'UsertoBike entry created successfully', idUsertobike: this.lastID });
            console.log('UsertoBike entry created successfully. Last inserted ID:', this.lastID);
        });
    },

    /*
        Update an existing UsertoBike entry with the specified values
    */
    update: function (idUsertobike, usertoBike, res) {
        const sql = 'UPDATE UsertoBike SET ' +
            'user_userid = COALESCE(?, user_userid), ' +
            'scooterId = COALESCE(?, scooterId), ' +
            'startTime = COALESCE(?, startTime), ' +
            'stopTime = COALESCE(?, stopTime), ' +
            'price = COALESCE(?, price) ' +
            'WHERE idUsertobike = ?';

        const params = [
            usertoBike.user_userid || null,
            usertoBike.scooterId || null,
            usertoBike.startTime || null,
            usertoBike.stopTime || null,
            usertoBike.price || null,
            idUsertobike
        ];

        db.run(sql, params, function (error) {
            if (error) {
                console.error('Error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            res.status(201).json({ message: 'UsertoBike entry updated successfully' });
            console.log('UsertoBike entry updated successfully.');
        });
    },

    /*
        Delete an existing UsertoBike entry from the database
    */
    delete: function (idUsertobike, res) {
        const sql = 'DELETE FROM UsertoBike WHERE idUsertobike = ?';
        db.run(sql, [idUsertobike], function (error) {
            if (error) {
                console.error('Error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            res.json({ message: 'UsertoBike entry deleted successfully' });
        });
    }
};

module.exports = usertoBikeModel;
