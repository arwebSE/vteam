[1mdiff --git a/backend/databases/sql/create_basedbs.sql b/backend/databases/sql/create_basedbs.sql[m
[1mindex 3cb8977..2b3d7a5 100644[m
[1m--- a/backend/databases/sql/create_basedbs.sql[m
[1m+++ b/backend/databases/sql/create_basedbs.sql[m
[36m@@ -1,24 +1,9 @@[m
 CREATE USER 'adm'@'%' IDENTIFIED BY 'pass';[m
 GRANT ALL PRIVILEGES ON adm.* TO 'adm'@'%';[m
 [m
[31m-CREATE DATABASE user;[m
[31m-USE doe;[m
[32m+[m[32mCREATE DATABASE users_andbikes;[m[41m[m
[32m+[m[32mUSE users_andbikes;[m[41m[m
 [m
[31m-CREATE TABLE doe ( namn CHAR(10) );[m
[31m-INSERT INTO doe VALUES ("Jane Doe"), ("John Doe");[m
[32m+[m[32mCREATE TABLE user ( userId INT, username VARCHAR(45), email VARCHAR(45), password(VARCHAR(45)));[m[41m[m
 [m
[31m-[m
[31m-CREATE DATABASE scooter;[m
[31m-USE scooter;[m
[31m-[m
[31m-[m
[31m-[m
[31m-CREATE DATABASE point[m
[31m-USE point;[m
[31m-[m
[31m-[m
[31m-CREATE database city;[m
[31m-use city;[m
[31m-[m
[31m-create DATABASE zones;[m
[31m-use zones;[m
\ No newline at end of file[m
[32m+[m[32mCREATE TABLE scooter (scooterId INT, lon FLOAT, )[m
\ No newline at end of file[m
