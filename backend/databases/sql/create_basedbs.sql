CREATE USER 'adm'@'%' IDENTIFIED BY 'pass';
GRANT ALL PRIVILEGES ON adm.* TO 'adm'@'%';

CREATE DATABASE users_andbikes;
USE users_andbikes;

CREATE TABLE user ( userId INT, username VARCHAR(45), email VARCHAR(45), password(VARCHAR(45)));

CREATE TABLE scooter (scooterId INT, lon FLOAT, )