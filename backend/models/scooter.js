const db = require("../databases/sql/database.js");

/**
 * A model representing scooter-related operations with the database.
 * @namespace
 */
const scooterModel = {
    /**
     * Get all information about all Scooters in the database. Also get the cityName of the city the scooter is at, if any.
     * @param {Object} res - The Express response object.
     * @returns {void}
     */
    getAll: function (res) {
        db.all('SELECT Scooter.*, IFNULL(City.id, "-") AS cityName FROM Scooter LEFT JOIN City ON Scooter.city_cityid = City.cityId', function (error, results, fields) {
            if (error) throw error;
            res.json(results);
        });
    },
    /**
     * Get all information about a specific Scooter in the database by its scooterId. Also get the cityName of the city the scooter is at, if any.
     * @param {string|number} id - The scooterId of the scooter to retrieve.
     * @param {Object} res - The Express response object.
     * @returns {void}
     */
    getOne: function (id, res) {
        db.get('SELECT Scooter.*, IFNULL(City.id, "-") AS cityName FROM Scooter LEFT JOIN City ON Scooter.city_cityid = City.cityId WHERE Scooter.scooterId = ?', id, function (error, results, fields) {
            if (error) throw error;
            res.json(results);
        });
    },
    getAllFromCity: function (city, res) {
        const sql = 'SELECT Scooter.*' +
            'FROM Scooter ' +
            'JOIN City ON Scooter.city_cityid = City.cityId ' +
            'WHERE City.id = ?;';
        db.all(sql, [city], function (error, results) {
            if (error) {
                console.error('Error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            res.json(results);
        });
    },

    /*
        Get all information about all Scooters in the database with status = available. Also get the cityName of the city the scooter is at, if any.
    */
    getAllAvailable: function (res) {
        const sql = 'SELECT Scooter.*, IFNULL(City.id, "-") AS cityName ' +
            'FROM Scooter ' +
            'LEFT JOIN City ON Scooter.city_cityid = City.cityId ' +
            'WHERE LOWER(Scooter.status) = "available"';

        db.all(sql, function (error, results) {
            if (error) {
                console.error('Error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            res.json(results);
        });
    },
    /**
     * Create a new Scooter in the database with (lon, lat, battery, status, city_cityid).
     * @param {Object} scooter - The scooter object containing lon, lat, battery, status, and city_cityid.
     * @param {Object} res - The Express response object.
     * @returns {void}
     */

    create: function (scooter, res) {
        const sql = 'INSERT INTO Scooter (lon, lat, battery, status, city_cityid) VALUES (?, ?, ?, ?, ?)';
        const params = [scooter.lon, scooter.lat, scooter.battery, scooter.status, scooter.city_cityid];
        db.run(sql, params, function (error) {
            if (error) {
                console.error('Error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            res.status(201).json({ message: 'Scooter created successfully', scooterId: this.lastID });
            console.log('Scooter created successfully. Last inserted ID:', this.lastID);
        });
    },
    /**
     * Update a specific Scooter in the database with data you want to change (lon, lat, battery, status, city_cityid) using the ScooterId.
     * @param {string|number} scooterId - The scooterId of the scooter to update.
     * @param {Object} scooter - The updated scooter object containing lon, lat, battery, status, and city_cityid.
     * @param {Object} res - The Express response object.
     * @returns {void}
     */
    update: function (scooterId, scooter, res) {
        const sql = 'UPDATE Scooter SET ' +
            'lon = COALESCE(?, lon), ' +
            'lat = COALESCE(?, lat), ' +
            'battery = COALESCE(?, battery), ' +
            'status = COALESCE(?, status), ' +
            'city_cityid = COALESCE(?, city_cityid), ' +
            'speed = COALESCE(?, speed)' +
            'WHERE scooterId = ?';

        const params = [
            scooter.lon || null,
            scooter.lat || null,
            scooter.battery || null,
            scooter.status || null,
            scooter.city_cityid || null,
            scooter.speed || null,
            scooterId
        ];

        db.run(sql, params, function (error, results) {
            if (error) {
                console.error('Error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            res.status(201).json({ message: 'Scooter updated successfully' });
            console.log('Scooter updated successfully.');
        });
    },
    updateMultiple: function (scooters, res) {
        const promises = scooters.map(scooter => {
            return new Promise((resolve, reject) => {
                const sql = 'UPDATE Scooter SET ' +
                    'lon = COALESCE(?, lon), ' +
                    'lat = COALESCE(?, lat), ' +
                    'battery = COALESCE(?, battery), ' +
                    'status = COALESCE(?, status), ' +
                    'city_cityid = COALESCE(?, city_cityid), ' +
                    'speed = COALESCE(?, speed)' +
                    'WHERE scooterId = ?';

                const params = [
                    scooter.lon || null,
                    scooter.lat || null,
                    scooter.battery || null,
                    scooter.status || null,
                    scooter.city_cityid || null,
                    scooter.speed !== undefined ? scooter.speed : 0,
                    scooter.scooterId
                ];

                db.run(sql, params, function (error, results) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve();
                    }
                });
            });
        });

        Promise.all(promises)
            .then(() => res.status(201).json({ message: 'Scooters updated successfully' }))
            .catch(error => res.status(500).json({ error: 'Internal Server Error' }));
    },
    /*
        Delete ALL Scooters in the database, from ALL cities
    */
    deleteAll: function (res) {
        const sql = 'DELETE FROM Scooter';
        db.run(sql, function (error, results) {
            if (error) {
                console.error('Error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            res.json({ message: 'All scooters deleted successfully' });
        });
    },
    getLowBatteryScooter: function (res) {
        const sql = 'SELECT * FROM Scooter WHERE battery < 20';
        db.all(sql, function (error, results) {
            if (error) {
                console.error('Error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            res.json(results);
        });
    },
    /**
     * Delete one specific Scooter in the database depending on the scooterId.
     * @param {string|number} id - The scooterId of the scooter to delete.
     * @param {Object} res - The Express response object.
     * @returns {void}
     */
    delete: function (id, res) {
        const sql = 'DELETE FROM Scooter WHERE scooterId = ?';
        db.run(sql, id, function (error, results) {
            if (error) {
                console.error('Error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            res.json({ message: 'Scooter deleted successfully' });
        });
    }
};

module.exports = scooterModel;
