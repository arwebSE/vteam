
CREATE TABLE Users (
    userId INTEGER PRIMARY KEY,
    username VARCHAR(45) NOT NULL,
    email VARCHAR(45),
    passwd VARCHAR(45)
); CREATE TABLE City(
    cityId INTEGER primary key AUTOINCREMENT,
    id VARCHAR(45) NOT NULL,
    lat FLOAT NOT NULL,
    lon FLOAT NOT NULL
); CREATE TABLE Scooter(
    scooterId INTEGER PRIMARY KEY AUTOINCREMENT,
    lon FLOAT,
    city_cityid INT,
    FOREIGN KEY(city_cityid) REFERENCES city(cityId)
); CREATE TABLE Zones(
    pointname VARCHAR(45),
    zoneId INT primary key,
    city_cityid INT NOT NULL,
    zonetype VARCHAR(20) NOT NULL,
    FOREIGN KEY(city_cityid) REFERENCES city(cityId)
); CREATE TABLE UsertoBike(
    idUsertobike INT primary key,
    user_userid INT,
    scooterId INT,
    startTime TIMESTAMP NOT NULL,
    stopTime TIMESTAMP NOT NULL,
    price FLOAT,
    FOREIGN KEY(user_userid) REFERENCES users(userId),
    FOREIGN KEY(scooterId) REFERENCES scooter(scooterId)
); CREATE TABLE credentials(
    user_id INT NOT NULL, 
    authprov VARCHAR(20) NOT NULL,
    user_subject TEXT NOT NULL,
    PRIMARY KEY (authprov, user_subject)
)