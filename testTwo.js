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

// const input = 4
// connection.query("Select * from department", function (err, res) {
//    // console.log(res[0].department_id)
//    if (err) {
//       return res.status(500).end();
//    }
//    let newArray = []
//    for (var i = 0; i < res.length; i++) {
//       newArray.push(res[i].department_id)
//    }
//    console.log(newArray)
//    console.log(input)
//    let filteredID = newArray.filter(function (e) {
//       return e === input
//    })
//    console.log(filteredID[0]);
//    if (filteredID[0] === undefined) {
//       return console.log("Department ID not found")
//    }
//    return true
// });
// const validateDepartment = async (input) => {
// if (input === "") {
//    return console.log('Insert valid Department ID');
// }

connection.query("Select * From employee", (err, res) => {
   if (err) throw err;

   const employeeArray = []
   const roleArray = []
   for (var i = 0; i < res.length; i++) {
      roleArray.push(res[i].role_id);
      employeeArray.push(res[i].employee_id)
   }


   inquirer.prom

function addRole() {

   connection.query("Select * from department", function (err, res) {
      // const response = []
      const newArray = []
      for (var i = 0; i < res.length; i++) {
         newArray.push(res[i].department_id)
      }
      console.log(newArray);
      inquirer.prompt([
         {
            message: "Enter name of new title:",
            type: "input",
            name: "roleTitle",
            // validate: validateString
         },
         {
            message: "Enter number amount of new title salary:",
            type: "input",
            name: "roleSalary",
            // validate: validateDecimal
         },
         {
            message: "Enter department id of new role:",
            type: "input",
            name: "roleDepartment",
            validate: async function f(roleDepartment) {
               console.log(newArray)
               let filteredID = newArray.filter(e => e == roleDepartment);
               console.log(JSON.stringify(filteredID[0]));
               console.log(roleDepartment);
               // console.log(newArray.indexOf(roleDepartment) > -1);
               
               if (roleDepartment == '') {
                  return "Value cannot be empty"
               }
               if (roleDepartment !== JSON.stringify(filteredID[0])) {
                  return "Department ID does not exist"
               }
               return true
            }
         }
      ])
         .then(function (answer) {
            const title = answer.roleTitle
            const salary = answer.roleSalary
            const department = answer.roleDepartment

            connection.query("INSERT INTO role (title, salary, department_id) VALUES ( ?, ?, ? )", [title, salary, department], function (err, res) {
               if (err) throw err;

               console.log("Successfully added new role: " + title + "\nWith salary: " + salary + "\nIn department: " + department)
               // userPrompts();
            });
         });
   });

}
addRole();


function updateRecord() {
   connection.query("Select * From employee", (err, res) => {
      if (err) throw err;

      console.table(res)
   });
   connection.query("Select * From employee", (err, res) => {
      if (err) throw err;

      const employeeArray = []
      const roleArray = []
      for (var i = 0; i < res.length; i++) {
         roleArray.push(res[i].role_id);
         employeeArray.push(res[i].employee_id)
      }


      inquirer.prompt([
         {
            message: "The employee list is displayed. Ready to edit?",
            type: "list",
            choices: ["OK"],
            name: "action"
         },
         {
            message: "Enter employee_id of employee you are editing: ",
            type: "input",
            name: "employee_id",
            validate: async function f(employeeId) {

               let filteredID = employeeArray.filter(e => e == employeeId);

               if (employeeId == '') {
                  return "Value cannot be empty"
               }
               if (employeeId !== JSON.stringify(filteredID[0])) {
                  return "Employee ID does not exist"
               }
               return true
            }
         },
         {
            message: "Updated first name is: ",
            type: "input",
            name: "first_name",
            validate: validateString
         },
         {
            message: "Updated last name is: ",
            type: "input",
            name: "last_name",
            validate: validateString
         },
         {
            message: "Updated role_id is: ",
            type: "input",
            name: "role_id",
            validate: async function f(roleId) {

               let filteredID = roleArray.filter(e => e == roleId);

               if (roleId == '') {
                  return "Value cannot be empty"
               }
               if (roleId !== JSON.stringify(filteredID[0])) {
                  return "Role ID does not exist"
               }
               return true
            }
         },
         {
            message: "Updated manager_id is: ",
            type: "input",
            name: "manager_id",
            validate: async function f(roleId) {

               let filteredID = roleArray.filter(e => e == roleId);

               if (roleId == '') {
                  return "Value cannot be empty"
               }
               if (roleId !== JSON.stringify(filteredID[0])) {
                  return "Role ID does not exist"
               }
               return true
            }
         }
      ])
         .then(function (answer) {
            const id = answer.employee_id;
            const first = answer.first_name;
            const last = answer.last_name;
            const role = answer.role_id;
            const manager = answer.manager_id;

            connection.query("Update employee set first_name = ?, last_name = ?, role_id = ?, manager_id = ? where employee_id = ?",
               [first, last, role, manager, id], function (err, res) {
                  if (err) throw err;

                  console.log("Successfully update employee with id " + id)
                  userPrompts();
               })

         });

   });

}