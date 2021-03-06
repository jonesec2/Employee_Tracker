//=================================================
const mysql = require("mysql");
const inquirer = require("inquirer");
// const cTable = require('console.table');
const welcome = require('./lib/welcome');
const endProgram = require('./lib/endProgram');

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

// main hub for all questions, all other queries at end bring user back to this function
function userPrompts() {
   inquirer.prompt([
      {
         message: "What would you like to do?",
         type: "list",
         choices: ["Add new", "View existing", "Update employees roles", "End program"],
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

            case "Update employees roles":
               updateRecord();
               break;

            case "End program":
               endProgram();
               break;
         }
      });

}


///////////////////////////////////////////////////////////////////////
// Create section
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

///////////////////////////////////////////////////////////////////////
// Reused validations
const validateDecimal = async (input) => {
   if (input === /^[a-zA-Z]/ || input === "") {
      return 'Insert valid numerical value';
   }
   return true
};


const validateString = async (input) => {
   if (input === '') {
      return "Value can't be null"
   }
   return true
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

//add Role function handles Insert Into for Role table
function addRole() {

   // to handle async nature and validate department id we start with  the sql query
   connection.query("Select * from department", function (err, res) {
      // we now loop over response to get valid Id's and push to array
      const newArray = []
      for (var i = 0; i < res.length; i++) {
         newArray.push(res[i].department_id)
      }
      // now we start the prompts
      inquirer.prompt([
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
            // to validate we check the input the user gives us against the values we got earlier
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
         // all validations pass, now we can make take inquirer results and make sql query
         .then(function (answer) {
            const title = answer.roleTitle
            const salary = answer.roleSalary
            const department = answer.roleDepartment

            // sql query to create new record
            connection.query("INSERT INTO role (title, salary, department_id) VALUES ( ?, ?, ? )", [title, salary, department], function (err, res) {
               if (err) throw err;

               console.log("Successfully added new role: " + title + "\nWith salary: " + salary + "\nIn department: " + department)
               userPrompts();
            });
         });
   });

}

function addEmployee() {

   connection.query("Select * From employee", (err, res) => {
      if (err) throw err;

      const roleArray = []
      for (var i = 0; i < res.length; i++) {
         roleArray.push(res[i].role_id);
      }

      return inquirer.prompt([
         {
            message: "Enter first name of new employee:",
            type: "input",
            name: "employeeFirst",
            validate: validateString
         },
         {
            message: "Enter last name of new employee:",
            type: "input",
            name: "employeeLast",
            validate: validateString
         },
         {
            message: "Enter Role ID of new employee:",
            type: "input",
            name: "employeeRole",
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
            message: "Enter Manager ID of new employee (if they have one. If not, blank is acceptable):",
            type: "input",
            name: "employeeManager",
            validate: async function f(managerId) {

               let filteredID = roleArray.filter(e => e == managerId);

               if (managerId == '') {
                  return "Value cannot be empty"
               }
               if (managerId !== JSON.stringify(filteredID[0])) {
                  return "Role ID does not exist"
               }
               return true
            }
         }
      ])
         .then(function (answer) {
            const first_name = answer.employeeFirst
            const last_name = answer.employeeLast
            const role_id = answer.employeeRole
            const manager_id = answer.employeeManager

            connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ( ?, ?, ?, ? )", [first_name, last_name, role_id, manager_id], function (err, res) {
               if (err) throw err;

               console.log("Successfully added new employee: " + first_name + " " + last_name + "\nWith role id: " + role_id + " and manager id " + manager_id)
               userPrompts();
            });
         });
   });
}

///////////////////////////////////////////////////////////////////////
// View section
function viewRecord() {
   return inquirer.prompt([
      {
         message: "What would you like to view?",
         type: "list",
         choices: ["View department(s)", "View role(s)", "View employee(s)", "View utilized budget of a department"],
         name: "create"
      }
   ])
      .then(function (answer) {

         switch (answer.create) {
            case "View department(s)":
               viewDepartment();
               break

            case "View role(s)":
               viewRole();
               break

            case "View employee(s)":
               viewEmployee();
               break
            case "View utilized budget of a department":
               departmentBudget();
               break
         }
      })
}

function viewDepartment() {
   connection.query("Select * From department", (err, res) => {
      if (err) throw err;

      console.table(res)
      userPrompts();
   });
}

function viewRole() {
   connection.query("Select * From role", (err, res) => {
      if (err) throw err;

      console.table(res)
      userPrompts();
   });
}

function viewEmployee() {
   connection.query("Select * From employee", (err, res) => {
      if (err) throw err;

      console.table(res)
      userPrompts();
   });
}

function departmentBudget() {
   connection.query("Select a.name, sum(b.salary) as Total_cost From department a Inner Join role b on a.department_id = b.department_id Inner Join employee c on b.role_id = c.role_id Group By a.name;", (err, res) => {
      if (err) throw err;

      console.table(res)
      userPrompts();
   });
}

///////////////////////////////////////////////////////////////////////
// Update section
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