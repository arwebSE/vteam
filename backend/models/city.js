const database = require('../databases/sql/database.js');

const cityModel = {
    /*
        Get all information in the City table in database (All cities information)
    */
    getAll: function (res) {
        database.all('SELECT * FROM City', function (error, results, fields) {
            if (error) throw error;
            res.json(results);
        });
    },

    /*
        You can get all information about a specific city with cityId or id (cityName)
        Example: 1 or Stockolm (if Stockholm is 1 in City table in database)
    */
    getOne: function (param, res) {
        const sql = 'SELECT * FROM City WHERE cityId = ? OR id = ?';
        database.get(sql, [param, param], function (error, results, fields) {
        if (error) throw error;
        res.json(results);
        });
    },

    /*
        Create a new city with the VALUES (id/cityName, latitude, longitude) --> cityId creates automatically
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

    /*
         Update a already existing city with values WHERE cityId or id (cityName) --> You can Update depending on cityName or its cityId
         Example: Stockholm or 1 (if Stockholm is 1 in the City table in database)
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
                cityId // The third occurrence is for handling the string id
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

    /*
        You can delete a existing city from the database with both cityId or id (cityName)
        Example: Stockholm or 1 (if Stockholm is 1 in the City table in database)
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
