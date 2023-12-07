const db = require("../databases/sql/database.js");

const scooterModel = {
    /*
        Get all information about all Scooters in the database. Also get the cityName of the city the scooter is at, if any
    */
    getAll: function (res) {
        db.all('SELECT Scooter.*, IFNULL(City.id, "-") AS cityName FROM Scooter LEFT JOIN City ON Scooter.city_cityid = City.cityId', function (error, results, fields) {
            if (error) throw error;
            res.json(results);
        });
    },
    /*
        Get all information about a specific Scooter in the database by its scooterId. Also get the cityName of the city the scooter is at, if any.
    */
    getOne: function (id, res) {
        db.get('SELECT Scooter.*, IFNULL(City.id, "-") AS cityName FROM Scooter LEFT JOIN City ON Scooter.city_cityid = City.cityId WHERE Scooter.scooterId = ?', id, function (error, results, fields) {
            if (error) throw error;
            res.json(results);
        });
    },
    /*
        Create a new Scooter in the database with (lon, city_cityid)
    */
    create: function (scooter, res) {
        const sql = 'INSERT INTO Scooter (lon, city_cityid) VALUES (?, ?)';
        const params = [scooter.lon, scooter.city_cityid];

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
    /*
        Update a specific Scooter in the database with data you want to change (lon, city_cityid) using the ScooterId
    */
    update: function (scooterId, scooter, res) {
        const sql = 'UPDATE Scooter SET ' +
            'lon = COALESCE(?, lon), ' +
            'city_cityid = COALESCE(?, city_cityid) ' +
            'WHERE scooterId = ?';

        const params = [
            scooter.lon || null,
            scooter.city_cityid || null,
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
    /*
        Delete one specific Scooter in the database depending on the scooterId
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
