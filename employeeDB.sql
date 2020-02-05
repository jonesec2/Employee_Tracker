-- creating database
create database employee_db;

-- using the newly made database
use employee_db;

-- creating the first table
-- we auto increment and made named the primary key department_id
create table department (
	department_id integer not null auto_increment primary key,
    name varchar(30)
);

-- we auto increment and made named the primary key role_id
-- will make a foreign key for deparment_id later
create table role (
	role_id integer not null auto_increment primary key,
    title varchar(30),
    salary decimal(10,2),
    department_id integer not null
);

-- we auto increment and made named the primary key employee_id
-- we will make a foreign key for role_id later
create table employee (
	employee_id integer not null auto_increment primary key,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
	role_id integer not null,
    manager_id integer
);