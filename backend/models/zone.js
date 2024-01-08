const database = require('../databases/sql/database.js');

/**
 * A model representing operations related to the Zones table in the database.
 * @namespace
 */
const zoneModel = {

    /**
     * Get all information in the Zones table in the database (All entries).
     * @param {Object} res - The Express response object.
     * @returns {void}
     */
    getAll: function (res) {
        const sql = 'SELECT * FROM Zones';

        database.all(sql, function (error, results, fields) {
            if (error) throw error;
            res.json(results);
        });
    },

    /**
     * Get information about a specific Zone by its zoneId or pointname.
     * @param {string|number} identifier - The zoneId or pointname of the Zone to retrieve.
     * @param {Object} res - The Express response object.
     * @returns {void}
     */
    getOne: function (identifier, res) {
        const sql = 'SELECT zoneId, city_name, zonetype, coordinates ' +
            'FROM Zones ' +
            'WHERE zoneId = ? OR city_name = ?';

        database.get(sql, [identifier, identifier], function (error, results, fields) {
            if (error) throw error;
            res.json(results);
        });
    },

    /**
     * Get all City Zones in a specific city.
     * @param {Object} res - The Express response object.
     * @param {string} city - The name of the city.
     * @returns {void}
     */
    getCityZones: function (res, city) {
        const sql = "SELECT * FROM Zones WHERE zonetype = 'City' AND city_name = ?";
        database.all(sql, [city], function (error, results) {
            if (error) throw error;
            res.json(results);
        });
    },

    /**
     * Get all No Go Zones in a specific city.
     * @param {Object} res - The Express response object.
     * @param {string} city - The name of the city.
     * @returns {void}
     */
    getNoGoZones: function (res, city) {
        const sql = "SELECT * FROM Zones WHERE zonetype = 'No Go Zone' AND city_name = ?";
        database.all(sql, [city], function (error, results) {
            if (error) throw error;
            res.json(results);
        });
    },

    getRestrictedZones: function (res, city) {
        const sql = "SELECT * FROM Zones WHERE zonetype = 'Restricted Speed' AND city_name = ?";
        database.all(sql, [city], function (error, results) {
            if (error) throw error;
            res.json(results);
        });
    },
    /**
     * Create a new Zone entry in the database with the specified values (city_name, coordinates, zonetype).
     * @param {Object} zone - The Zone object containing city_name, coordinates, and zonetype.
     * @param {Object} res - The Express response object.
     * @returns {void}
     */
    create: function (zone, res) {
        const sql = 'INSERT INTO Zones (city_name, coordinates, zonetype) VALUES (?, ?, ?)';
        const params = [zone.body.city_name, zone.body.coordinates, zone.body.zonetype];
        console.log(params);
        database.run(sql, params, function (error) {
            if (error) {
                console.error('Error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            res.status(201).json({ message: 'Zone created successfully', zoneId: this.lastID });
            console.log('Zone created successfully. Last inserted ID:', this.lastID);
        });
    },

    /**
     * Update an existing Zone entry with the specified values.
     * @param {string|number} identifier - The zoneId or pointname of the Zone to update.
     * @param {Object} zone - The updated Zone object containing pointname, zoneId, city_cityid, and zonetype.
     * @param {Object} res - The Express response object.
     * @returns {void}
     */
    update: function (identifier, zone, res) {
        const sql = 'UPDATE Zones SET ' +
            'pointname = COALESCE(?, pointname), ' +
            'zoneId = COALESCE(?, zoneId), ' +
            'city_cityid = COALESCE(?, city_cityid), ' +
            'zonetype = COALESCE(?, zonetype) ' +
            'WHERE zoneId = ? OR pointname = ?';

        const params = [
            zone.pointname || null,
            zone.zoneId || null,
            zone.city_cityid || null,
            zone.zonetype || null,
            identifier,
            identifier
        ];

        database.run(sql, params, function (error, results) {
            if (error) {
                console.error('Error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            res.status(201).json({ message: 'Zone updated successfully' });
            console.log('Zone updated successfully.');
        });
    },
    /**
     * Delete one Zone from the database by its zoneId.
     * @param {number} zoneId - The zoneId of the Zone to delete.
     * @param {Object} res - The Express response object.
     * @returns {void}
     */
    delete: function (zoneId, res) {
        const sql = 'DELETE FROM Zones WHERE zoneId = ?';
        database.run(sql, [zoneId], function (error, results) {
            if (error) {
                console.error('Error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            res.json({ message: 'Zone deleted successfully' });
        });
    }
};

module.exports = zoneModel;
