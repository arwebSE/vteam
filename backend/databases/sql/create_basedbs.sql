CREATE USER 'adm'@'%' IDENTIFIED BY 'pass';
GRANT ALL PRIVILEGES ON adm.* TO 'adm'@'%';

CREATE DATABASE user;
USE doe;

CREATE TABLE doe ( namn CHAR(10) );
INSERT INTO doe VALUES ("Jane Doe"), ("John Doe");


CREATE DATABASE scooter;
USE scooter;



CREATE DATABASE point
USE point;


CREATE database city;
use city;

create DATABASE zones;
use zones;