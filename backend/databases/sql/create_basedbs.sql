DROP TABLE IF EXISTS UsertoBike;
DROP TABLE IF EXISTS Zones;
DROP TABLE IF EXISTS Scooter;
DROP TABLE IF EXISTS City;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Log;

CREATE TABLE Users (
    userId INTEGER PRIMARY KEY,
    username VARCHAR(45) NOT NULL,
    email VARCHAR(45),
    passwd VARCHAR(45),
    authprov VARCHAR(20),
    user_authid TEXT,
    userrole TEXT,
    user_balance DECIMAL(10, 2) DEFAULT 0.00
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
    zoneId INTEGER PRIMARY KEY,
    city_name VARCHAR(45),
    zonetype VARCHAR(45),
    coordinates GEOMETRY,
    FOREIGN KEY(city_name) REFERENCES city(id)
);
CREATE TABLE UsertoBike(
    idUsertobike INTEGER PRIMARY KEY AUTOINCREMENT,
    user_userid INT,
    scooterId INT,
    startTime TIMESTAMP NOT NULL,
    stopTime TIMESTAMP NOT NULL,
    price FLOAT,
    FOREIGN KEY(user_userid) REFERENCES users(userId),
    FOREIGN KEY(scooterId) REFERENCES scooter(scooterId)
);
CREATE TABLE Log (
    logId INTEGER PRIMARY KEY,
    user_userid INT,
    scooterId INT,
    startTime TIMESTAMP NOT NULL,
    stopTime TIMESTAMP NOT NULL,
    returnTime TIMESTAMP NOT NULL,
    price FLOAT,
    totalPrice FLOAT,
    FOREIGN KEY(user_userid) REFERENCES users(userId),
    FOREIGN KEY(scooterId) REFERENCES scooter(scooterId)
);