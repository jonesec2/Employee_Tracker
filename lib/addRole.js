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


function addRole() {
   return inquirer.prompt([
      {
         message: "Enter name of new title:",
         type: "input",
         name: "roleTitle",
         validate: validateString
      },
      {
         message: "Enter number amount of new title salary:",
         type: "input",
         name: "roleSalary",
         validate: validateDecimal
      },
      {
         message: "Enter department id of new role:",
         type: "input",
         name: "roleDepartment",
         validate: validateDepartment
      }
   ])
      .then(function (answer) {
         const title = answer.roleTitle
         const salary = answer.roleSalary
         const department = answer.roleDepartment
         console.log(title + "\n" + salary + "\n" + department)

         connection.query("INSERT INTO role (title, salary, department_id) VALUES ( ?, ?, ? )", [title, salary, department], function (err, res) {
            if (err) throw err;

            console.log("Successfully added new role: " + title + "\nWith salary: " + salary + "\nIn department: " + department)
            userPrompts();
         });
      });
}

module.exports = addRole;