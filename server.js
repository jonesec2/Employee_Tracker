//=================================================
const path = require("path");
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
const welcome = require('./lib/welcome');
const endProgram = require('./lib/endProgram');
const userPrompts = require('./lib/userPrompts');
const addRecord = require('./lib/addDepartment');
const addDepartment = require('./lib/addRecord');

var connection = mysql.createConnection({
   host: "localhost",
   // Your port; if not 3306
   port: 3306,
   // Your username
   user: "root",
   // Your password
   password: "Testing_1",
   database: "employee_db"
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



// code that validates the FK constraint
const validateDecimal = async (input) => {
   if (input !== /^[0-9]+$/ || input === "") {
      return 'Insert valid numerical value';
   }
   // if (Number.isInteger(input)) {

   // }
   return true
};

const response = []
const newArray = []
async function getDepartmentKey() {
   try {
      await userPrompts();
      console.log("hey")
      connection.query("Select * from department", function (err, res) {
         for (var i = 0; i < res.length; i++) {
            newArray.push(res[i].department_id)
         }
         let filteredID = newArray.filter(e => e == input);
         console.log(newArray)
         console.log(filteredID[0])
         response.push(filteredID[0])
      });
   }
   catch (err) {
      console.log(err);
   }
}

const validateDepartment = async (input) => {
   if (input === "") {
      return 'Insert valid Department ID';
   }
   if (response[0] !== input) {
      return "Department ID not found"
   }
   return true
}

const validateString = async (input) => {
   if (input === '') {
      return "Value can't be null"
   }
   return true
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