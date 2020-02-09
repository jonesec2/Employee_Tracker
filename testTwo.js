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
            // validate: validateDepartment
         }
      ])
         .then(function (answer) {
            const title = answer.roleTitle
            const salary = answer.roleSalary
            const department = answer.roleDepartment
            
            const response = []
            let filteredID = newArray.filter(e => e == department);
            response.push(filteredID[0])
            
            console.log(newArray)
            console.log(response)
            if
   
            connection.query("INSERT INTO role (title, salary, department_id) VALUES ( ?, ?, ? )", [title, salary, department], function (err, res) {
               if (err) throw err;
   
               console.log("Successfully added new role: " + title + "\nWith salary: " + salary + "\nIn department: " + department)
               // userPrompts();
            });
         });
   });

}
addRole();