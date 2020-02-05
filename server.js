//=================================================
const express = require("express");
const path = require("path");
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
const welcome = require('./lib/welcome');
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
// const app = express();
// const PORT = process.env.PORT || 3000;

// //=================================================
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

//=================================================
connection.connect(function (err) {
   if (err) {
      console.error("error connecting: " + err.stack);
      return;
   }
   console.log("connected as id " + connection.threadId);
});

welcome();

userPrompts();

function userPrompts() {
   inquirer.prompt([
      {
         message: "What would you like to do?",
         type: "list",
         choices: ["Add new", "View existing", "Update roles"],
         name: "action"
      },
   ])
      .then(answer => {
         switch (answer.action) {
            case "Add new":
               addRecord();
               break;

            case "View existing":
               viewRecord();
               break;

            case "Update roles":
               updateRecord();
               break;
         }
      });
}


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

function addDepartment() {
   return inquirer.prompt(
      {
         message: "Enter name of new department:",
         type: "input",
         name: "department"
      }
   )
      .then(function (answer) {
         console.log('test')
         connection.query("INSERT INTO department VALUES ( ? )", [answer.department], (err, res) => {
            if (err) throw err;

            console.log("Successfully added new department: " + res.name + "\n With department id: " + res.departmentID)

         });
         userPrompts();
      });
}

function addRole() {
   return inquirer.prompt([
      {
         message: "Enter name of new title:",
         type: "input",
         name: "roleTitle"
      },
      {
         message: "Enter number amount of new title salary:",
         type: "input",
         name: "roleSalary"
      },
      {
         message: "Enter department id of new role:",
         type: "input",
         name: "roleDepartment",
         // how to validate FK with only valid department id's
         validate: function validateDepartment(departmentID) {
            return departmentID !== '';
         }
      }
   ])
      .then(function (answer) {
         connection.query("INSERT INTO role VALUES ( ?, ?, ? )", [answer.roleTitle, answer.roleSalary, answer.roleDepartment], function (err, res) {
            if (err) throw err;

            console.log("Successfully added new role: " + res.title + "\n With user id: " + res.roleID + "\n With salary: " + res.salary + "\n In department: " + res.departmentID)

         });
         userPrompts();
      });
}

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
         connection.query("INSERT INTO role VALUES ( ?, ?, ?, ? )", [answer.employeeFirst, answer.employeeLast, answer.employeeRole, answer.employeeManager], function (err, res) {
            if (err) throw err;

            console.log("Successfully added new employee: " + res.first_name + res.last_name + "\n" + "\n With role: " + res.roleID + "\n With manager id: " + res.managerid)

         });
         userPrompts();
      });
}


// Server is listening
//=================================================
// app.listen(PORT, function () {
//    console.log("App listening on PORT " + PORT);
// });
