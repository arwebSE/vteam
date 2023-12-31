// database.js
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const Spatialite = require('spatialite');
let db;

// const sqlCommands = `
// DROP TABLE IF EXISTS UsertoBike;
// DROP TABLE IF EXISTS Zones;
// DROP TABLE IF EXISTS Scooter;
// DROP TABLE IF EXISTS City;
// DROP TABLE IF EXISTS Users;

// CREATE TABLE Users (
//     userId INTEGER PRIMARY KEY,
//     username VARCHAR(45) NOT NULL,
//     email VARCHAR(45),
//     passwd VARCHAR(45),
//     authprov VARCHAR(20),
//     user_authid TEXT,
//     userrole TEXT
// ); CREATE TABLE City(
//     cityId INTEGER PRIMARY KEY,
//     id VARCHAR(45) NOT NULL,
//     lat FLOAT NOT NULL,
//     lon FLOAT NOT NULL
// ); CREATE TABLE Scooter(
//     scooterId INTEGER PRIMARY KEY,
//     lon FLOAT,
//     lat FLOAT,
//     battery FLOAT,
//     status VARCHAR(45),
//     city_cityid INT,
//     FOREIGN KEY(city_cityid) REFERENCES city(cityId)
// ); CREATE TABLE Zones(
//     zoneId INTEGER PRIMARY KEY,
//     city_name VARCHAR(45),
//     zonetype VARCHAR(45),
//     coordinates GEOMETRY,
//     FOREIGN KEY(city_name) REFERENCES city(id)
// );
// CREATE TABLE UsertoBike(
//     idUsertobike INTEGER PRIMARY KEY AUTOINCREMENT,
//     user_userid INT,
//     scooterId INT,
//     startTime TIMESTAMP NOT NULL,
//     stopTime TIMESTAMP NOT NULL,
//     price FLOAT,
//     FOREIGN KEY(user_userid) REFERENCES users(userId),
//     FOREIGN KEY(scooterId) REFERENCES scooter(scooterId)
// );
// `;

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