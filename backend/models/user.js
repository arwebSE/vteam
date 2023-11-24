// const database = require('../db/database.js');

const userModel = {
    getAll: function (res) {
        database.all('SELECT * FROM user', function (error, results, fields) {
            if (error) throw error;
            res.json(results);
        });
    },
    getOne: function (id, res) {
        database.query('SELECT * FROM user WHERE id = ?', id, function (error, results, fields) {
            if (error) throw error;
            res.json(results[0]);
        });
    },
    create: function (user, res) {
        database.query('INSERT INTO user SET ?', user, function (error, results, fields) {
            if (error) throw error;
            res.json(results);
        });
    },
    update: function (user, res) {
        database.query('UPDATE user SET ? WHERE id = ?', [user, user.id], function (error, results, fields) {
            if (error) throw error;
            res.json(results);
        });
    },
    delete: function (id, res) {
        database.query('DELETE FROM user WHERE id = ?', id, function (error, results, fields) {
            if (error) throw error;
            res.json(results);
        });
    }
};

module.exports = userModel;
