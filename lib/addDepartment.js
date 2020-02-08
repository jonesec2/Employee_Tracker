const inquirer = require('inquirer');
const userPrompts = require('./userPrompts');
const mysql = require("mysql");
const server = require('../server');

server
//=================================================
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Testing_1",
    database: "employee_db"
});


//=================================================
connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
});

//=================================================
const validateDepartment = async (input) => {
    if (input === "") {
        return 'Insert valid Department ID';
    }
    var numbers = /^[0-9]+$/;
    if (input !== numbers) {
        return "Department ID must be a number"
    }
    return true
}

//=================================================
function addDepartment() {
    return inquirer.prompt(
        {
            message: "Enter name of new department:",
            type: "input",
            name: "department",
            validate: validateDepartment
        }
    )
        .then(function (answer) {
            const name = answer.department
            connection.query("INSERT INTO department (name) VALUES ( ? )", name, (err, res) => {
                if (err) throw err;

                console.log("Successfully added new department: " + name);
                userPrompts();
            });
        });
}

module.exports = addDepartment;