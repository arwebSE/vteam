const db = require("../databases/sql/database.js");

const scooterModel = {
    getAll: function (res) {
        db.all('SELECT Scooter.*, IFNULL(City.id, "-") AS cityName FROM Scooter LEFT JOIN City ON Scooter.city_cityid = City.cityId', function (error, results, fields) {
            if (error) throw error;
            res.json(results);
        });
    },    
    getOne: function (id, res) {
        db.get('SELECT Scooter.*, IFNULL(City.id, "-") AS cityName FROM Scooter LEFT JOIN City ON Scooter.city_cityid = City.cityId WHERE Scooter.scooterId = ?', id, function (error, results, fields) {
            if (error) throw error;
            res.json(results);
        });
    },
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
