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

const input = 7
connection.query("Select * from department", function (err, res) {
   // console.log(res[0].department_id)
   if (err) {
      return res.status(500).end();
   }
   let newArray = []
   for (var i = 0; i < res.length; i++) {
      newArray.push(res[i].department_id)
   }
   console.log(newArray)
   console.log(input)
   let filteredID = newArray.filter(function (e) {
      return e === input
   })
   console.log(filteredID[0]);
   if (filteredID[0] === undefined) {
      return console.log("Department ID not found")
   }
   return true
});