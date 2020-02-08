const inquirer = require ('inquirer');
const addDepartment = require('./addDepartment');
const addRole = require('./addRole');
const addEmployee = require('');

function addRecord() {
    return inquirer.prompt([
        {
            message: "What would you like to add?",
            type: "list",
            choices: ["Add department(s)", "Add role(s)", "Add employee(s)"],
            name: "create"
        }
    ])
        .then(function (answer) {

            switch (answer.create) {
                case "Add department(s)":
                    addDepartment();
                    break

                case "Add role(s)":
                    addRole();
                    break

                case "Add employee(s)":
                    addEmployee();
                    break
            }
        })
}

module.exports = addRecord;