// database.js
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const Spatialite = require('spatialite');
let db;



console.log(process.env.ENV);
let path = __dirname;

if (process.env.ENV === 'simulation') {
  path += "/testdb.db";
} else {
  path += "/backenddata.db";
}

db = new sqlite3.Database(path, (err) => {
  if (err) {
    console.error('Database connection error:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});
db.spatialite(); // This line should be here for SQLite to support SpatiaLite

if (process.env.ENV === 'simulation') {
  db.exec(
    `
  DELETE FROM Scooter;
  DELETE FROM Users;
  `
    , function (err) {
      if (err) {
        console.error(err);
      } else {
        console.log("Table Users and Scooters dropped");
      }
    });
}

module.exports = db;