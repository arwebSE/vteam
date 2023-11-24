const database = require('../databases/sql/database.js');

const userModel = {
    getAll: function (res) {
        database.all('SELECT * FROM Users', function (error, results, fields) {
            if (error) throw error;
            res.json(results);
        });
    },
    getOne: function (id, res) {
        database.get('SELECT * FROM Users WHERE userId = ?', id, function (error, results, fields) {
            if (error) throw error;
            res.json(results);
        });
    },
    create: function (user, res) {
        //console.log(user);
        const sql = 'INSERT INTO Users (userId, username, email, passwd) VALUES (4, ?, ?, ?)';
        const params = [user.username, user.email, user.password];

        database.run(sql, params, function (error, results) {
            if (error) {
                console.error('Error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            res.status(201).json({ message: 'User created successfully' });
            console.log(results);
        });
    },
    update: function (user, res) {
        database.run('UPDATE user SET ? WHERE id = ?', [user, user.id], function (error, results, fields) {
            if (error) throw error;
            res.json(results);
        });
    },
    delete: function (id, res) {
        database.run('DELETE FROM user WHERE id = ?', id, function (error, results, fields) {
            if (error) throw error;
            res.json(results);
        });
    }
};

module.exports = userModel;
