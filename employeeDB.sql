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

insert into department (name) Value ('Development');
insert into department (name) Value ('Quality Assurance');
insert into department (name) Value ('Finance');
insert into department (name) Value ('Business');
insert into department (name) Value ('HR');

insert into role (title, salary, department_id) Value ('Developer One', 460.45, 1);
insert into role (title, salary, department_id) Value ('Lead Developer', 760.25, 1);
insert into role (title, salary, department_id) Value ('Tester One', 355.45, 2);
insert into role (title, salary, department_id) Value ('Lead Tester One', 400.71, 2);
insert into role (title, salary, department_id) Value ('Business Analyst One', 500.45, 4);
insert into role (title, salary, department_id) Value ('Clerk', 280.21, 5);
insert into role (title, salary, department_id) Value ('Salesperson', 480.61, 4);
insert into role (title, salary, department_id) Value ('Accountant', 400.21, 3);

insert into employee (first_name, last_name, role_id, manager_id) values ("Fabio", "Rodrigo", 1, 2);
insert into employee (first_name, last_name, role_id, manager_id) values ("Kat", "Ramone", 2, NULL);
insert into employee (first_name, last_name, role_id, manager_id) values ("Stephanie", "Li", 3, 4);
insert into employee (first_name, last_name, role_id, manager_id) values ("Ram", "Muniganti", 4, NULL);
insert into employee (first_name, last_name, role_id, manager_id) values ("Jordan", "Nu", 5, 2);
insert into employee (first_name, last_name, role_id, manager_id) values ("Priya", "Tiwari", 6, NULL);
insert into employee (first_name, last_name, role_id, manager_id) values ("Justin", "Mitchel", 7, NULL);
insert into employee (first_name, last_name, role_id, manager_id) values ("Greg", "Miller", 8, NULL);