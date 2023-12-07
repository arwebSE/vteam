const database = require('../databases/sql/database.js');

const zoneModel = {
    /*
        Get all data about all Zones in the database. Also get the cityName of the city the scooter is at, if any
    */
    getAll: function (res) {
        const sql = 'SELECT Zones.*, IFNULL(City.id, "-") AS cityName ' +
                    'FROM Zones ' +
                    'LEFT JOIN City ON Zones.city_cityid = City.cityId';

        database.all(sql, function (error, results, fields) {
            if (error) throw error;
            res.json(results);
        });
    },
    /*
        Get all data about one specific Zone in the database depending on the zoneId or pointname. Also get the cityName of the city the scooter is at, if any
    */
    getOne: function (identifier, res) {
        const sql = 'SELECT Zones.*, IFNULL(City.id, "-") AS cityName ' +
                    'FROM Zones ' +
                    'LEFT JOIN City ON Zones.city_cityid = City.cityId ' +
                    'WHERE Zones.zoneId = ? OR Zones.pointname = ?';

        database.get(sql, [identifier, identifier], function (error, results, fields) {
            if (error) throw error;
            res.json(results);
        });
    },
    /*
        Create a new Zone in the database by (pointname, zoneId, cityId, zonetype)
        Example: (Stortorget, 5, 1, Torg) or (Industriområde, 2, 3, Gul)
    */
    create: function (zone, res) {
        const sql = 'INSERT INTO Zones (pointname, zoneId, city_cityid, zonetype) VALUES (?, ?, ?, ?)';
        const params = [zone.body.pointname, zone.body.zoneId, zone.body.city_cityid, zone.body.zonetype];

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
    /*
        Update the data about one specific zone by its zoneId or pointname. You can update one or all parameters.
        Example: (-, -, 2, Grön) or (Stortorget, 3, 2, Torg), or (Hamnen, -, -, Röd)
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
    /*
        Delete one Zone from the database by its zoneId
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
