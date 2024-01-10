const database = require('../databases/sql/database.js');

/**
 * A model representing city-related operations with the database.
 * @namespace
 */
const cityModel = {
    /**
     * Get all information in the City table in the database (All cities information).
     * @param {Object} res - The Express response object.
     * @returns {void}
     */
    getAll: function (res) {
        database.all('SELECT * FROM City', function (error, results, fields) {
            if (error) throw error;
            res.json(results);
        });
    },

    /**
     * Get information about a specific city with cityId or id (cityName).
     * @param {string|number} param - The cityId or id (cityName) to search for.
     * @param {Object} res - The Express response object.
     * @returns {void}
     */
    getOne: function (param, res) {
        const sql = 'SELECT * FROM City WHERE cityId = ? OR id = ?';
        database.get(sql, [param, param], function (error, results, fields) {
        if (error) throw error;
        res.json(results);
        });
    },

    /**
     * Create a new city with the specified values (id/cityName, latitude, longitude).
     * @param {Object} city - The city object containing id, lat, and lon.
     * @param {Object} res - The Express response object.
     * @returns {void}
     */
    create: function (city, res) {
        const sql = 'INSERT INTO City (id, lat, lon) VALUES (?, ?, ?)';
        const params = [city.body.id, city.body.lat, city.body.lon];
    
        database.run(sql, params, function (error) {
        if (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.status(201).json({ message: 'City created successfully', cityId: this.lastID });
        console.log('City created successfully. Last inserted ID:', this.lastID);
        });
    },

    /**
     * Update an already existing city with values based on cityId or id (cityName).
     * @param {string|number} cityId - The cityId or id (cityName) of the city to update.
     * @param {Object} city - The updated city object containing id, lat, and lon.
     * @param {Object} res - The Express response object.
     * @returns {void}
     */
    update: function (cityId, city, res) {
        // Build the SQL query and parameters based on the provided or existing data
        const sql = 'UPDATE City SET ' +
            'id = COALESCE(?, id), ' +
            'lat = COALESCE(?, lat), ' +
            'lon = COALESCE(?, lon) ' +
            'WHERE cityId = ? OR id = ?';

            // Ensure that undefined values are replaced with null
            const params = [
                city.id || null,
                city.lat || null,
                city.lon || null,
                cityId,
                cityId
            ];

            database.run(sql, params, function (error, results) {
            if (error) {
                console.error('Error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            res.status(201).json({ message: 'City updated successfully' });
            console.log('City updated successfully.');
        });

    },

    /**
     * Delete an existing city from the database with both cityId or id (cityName).
     * @param {string|number} id - The cityId or id (cityName) of the city to delete.
     * @param {Object} res - The Express response object.
     * @returns {void}
     */
    delete: function (id, res) {
        const sql = 'DELETE FROM City WHERE cityId = ? OR id = ?';
        database.run(sql, [id, id], function (error, results) {
            if (error) {
                console.error('Error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            res.json({ message: 'City deleted successfully' });
        });
    }
};

module.exports = cityModel;
