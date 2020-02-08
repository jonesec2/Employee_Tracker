const inquirer = require('inquirer');
const userPrompts = require('./userPrompts');
const mysql = require("mysql");

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
function addEmployee() {
   return inquirer.prompt([
      {
         message: "Enter first name of new employee:",
         type: "input",
         name: "employeeFirst"
      },
      {
         message: "Enter last name of new employee:",
         type: "input",
         name: "employeeLast"
      },
      {
         message: "Enter role of new employee:",
         type: "input",
         name: "employeeRole"
      },
      {
         message: "Enter manager of new employee (if they have one. If not, blank is acceptable):",
         type: "input",
         name: "employeeManager"
      }
   ])
      .then(function (answer) {
         const first_name = answer.employeeFirst
         const last_name = answer.employeeLast
         const role_id = answer.employeeRole
         const manager = answer.employeeManager

         connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ( ?, ?, ?, ? )", [first_name, last_name, role_id, manager], function (err, res) {
            if (err) throw err;

            console.log("Successfully added new employee: " + first_name + " " + last_name + "\nWith role id: " + role_id + " and manager id " + manager_id)
            userPrompts();
         });
      });
}

module.exports = addEmployee;