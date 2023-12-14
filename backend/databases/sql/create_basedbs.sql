DROP TABLE IF EXISTS UsertoBike;
DROP TABLE IF EXISTS Zones;
DROP TABLE IF EXISTS Scooter;
DROP TABLE IF EXISTS City;
DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
    userId INTEGER PRIMARY KEY,
    username VARCHAR(45) NOT NULL,
    email VARCHAR(45),
    passwd VARCHAR(45),
    authprov VARCHAR(20),
    user_authid TEXT,
    userrole TEXT
); CREATE TABLE City(
    cityId INTEGER PRIMARY KEY,
    id VARCHAR(45) NOT NULL,
    lat FLOAT NOT NULL,
    lon FLOAT NOT NULL
); CREATE TABLE Scooter(
    scooterId INTEGER PRIMARY KEY,
    lon FLOAT,
    lat FLOAT,
    battery FLOAT,
    status VARCHAR(45),
    city_cityid INT,
    FOREIGN KEY(city_cityid) REFERENCES city(cityId)
); CREATE TABLE Zones(
    pointname VARCHAR(45),
    zoneId INTEGER PRIMARY KEY,
    city_cityid INT NULL,
    zonetype VARCHAR(20) NOT NULL,
    FOREIGN KEY(city_cityid) REFERENCES city(cityId)
); CREATE TABLE UsertoBike(
    idUsertobike INTEGER PRIMARY KEY AUTOINCREMENT,
    user_userid INT,
    scooterId INT,
    startTime TIMESTAMP NOT NULL,
    stopTime TIMESTAMP NOT NULL,
    price FLOAT,
    FOREIGN KEY(user_userid) REFERENCES users(userId),
    FOREIGN KEY(scooterId) REFERENCES scooter(scooterId)
);