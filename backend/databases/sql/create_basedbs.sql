CREATE USER 'adm'@'%' IDENTIFIED BY 'pass'; GRANT ALL PRIVILEGES
ON
    adm.* TO 'adm'@'%';
CREATE DATABASE users_andbikes; USE
    users_andbikes;
CREATE TABLE Users(
    userId INT NOT NULL,
    username VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL,
    passwd VARCHAR(45) NOT NULL,
    PRIMARY KEY(userId)
); CREATE TABLE City(
    cityId INT NOT NULL,
    id VARCHAR(45) NOT NULL,
    lat FLOAT NOT NULL,
    lon FLOAT NOT NULL
); CREATE TABLE Scooter(
    scooterId INT NOT NULL,
    lon FLOAT,
    city_cityid INT,
    PRIMARY KEY(scooterId),
    FOREIGN KEY(city_cityid) REFERENCES city(cityId)
); CREATE TABLE Zones(
    pointname VARCHAR(45),
    zoneId INT NOT NULL,
    city_cityid INT NOT NULL,
    zonetype VARCHAR(20) NOT NULL,
    PRIMARY KEY(zoneId),
    FOREIGN KEY(city_cityid) REFERENCES city(cityId)
); CREATE TABLE UsertoBike(
    idUsertobike INT NOT NULL,
    user_userid INT,
    scooterId INT,
    startTime TIMESTAMP NOT NULL,
    stopTime TIMESTAMP NOT NULL,
    price FLOAT,
    PRIMARY KEY(idUsertobike),
    FOREIGN KEY(user_userid) REFERENCES users(userId),
    FOREIGN KEY(scooterId) REFERENCES scooter(scooterId)
);