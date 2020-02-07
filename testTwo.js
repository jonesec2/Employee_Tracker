const path = require("path");
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
const welcome = require('./lib/welcome');
const endProgram = require('./lib/endProgram');
const Records = require('./lib/addNew');

var connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "Freaky1zepp!",
    database: "employeedb"
});


//=================================================
connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
});

const input = 2
connection.query("Select * from department where department_id = ?", input, function (err, res) {
    console.log(res)
    if (res !== "") {
        return console.log("yoo")
    }
});