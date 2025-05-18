
DROP DATABASE IF EXISTS classroomannouncementmanagementdb;
DROP USER IF EXISTS classroomannouncementmanagement;


CREATE USER classroomannouncementmanagement WITH PASSWORD 'password';


CREATE DATABASE classroomannouncementmanagementdb
    WITH TEMPLATE = template0
    OWNER = classroomannouncementmanagement;


\c classroomannouncementmanagementdb


ALTER DEFAULT PRIVILEGES GRANT ALL ON TABLES TO classroomannouncementmanagement;
ALTER DEFAULT PRIVILEGES GRANT ALL ON SEQUENCES TO classroomannouncementmanagement;

ALTER USER classroomannouncementmanagement WITH PASSWORD 'password';

