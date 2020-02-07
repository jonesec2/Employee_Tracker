//=================================================
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
   welcome();
   userPrompts();
});


function userPrompts() {
   inquirer.prompt([
      {
         message: "What would you like to do?",
         type: "list",
         choices: ["Add new", "View existing", "Update roles", "End program"],
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

            case "End program":
               endProgram();
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
         const name = answer.department
         connection.query("INSERT INTO department (name) VALUES ( ? )", name, (err, res) => {
            if (err) throw err;

            console.log("Successfully added new department: " + name);
            userPrompts();
         });
      });
}

// code that validates the FK constraint
const validateDecimal = async (input) => {
   if (input === /^[a-zA-Z]/ || input === "") {
      return 'Insert valid numerical value';
   }
   // if (Number.isInteger(input)) {

   // }
   return true
};

const validateDepartment = async (input) => {
   const department = connection.query("Select * from department where department_id = ?", input, function(err, res) {
      console.log(res)
   });
   // if (input !== department) {
   //    return 'This is not a valid department id';
   // }
   return true
}

const validateString = async (input) => {
   if (input === '') {
      return "Value can't be null"
   }
   return true
}


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
         console.log(title +"\n" + salary +"\n" + department )

         connection.query("INSERT INTO role (title, salary, department_id) VALUES ( ?, ?, ? )", [title, salary, department], function (err, res) {
            if (err) throw err;

            console.log("Successfully added new role: " + title + "\nWith salary: " + salary + "\nIn department: " + department)
            userPrompts();
         });
      });
}



////////////////////////////////////////
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