//=================================================
const express = require("express");
const path = require("path");
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
const welcome = require('./lib/welcome');
const New = require('./lib/addNew');

var connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "Testing_1",
    database: "top_songsDB"
});


//=================================================
const app = express();
const PORT = process.env.PORT || 3000;

//=================================================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//=================================================
welcome();


function userPrompts() {
    return inquirer.prompt([
        {
            message: "What would you like to do?",
            type: "list",
            choices: ["Add new", "View existing", "Update roles"],
            name: "action"
        },
        {
            message: "What would you like to add?",
            type: "list",
            choices: ["Add department(s)", "Add role(s)", "Add employee(s)"],
            name: "add",
            when: function (answer) {
                return answer.action === "Add new";
            }
        },
        {
            message: "What would you like to view?",
            type: "list",
            choices: ["View departments", "View roles", "View employees"],
            name: "view",
            when: function (answer) {
                return answer.action === "View existing";
            }
        },
        {
            message: "Decide who you will update",
            type: "list",
            choices: ["-", "-", "-"],
            name: "update",
            when: function (answer) {
                return answer.action === "Update roles";
            }
        },
        {
            message: "Are you done? Yes to end, no to start over.",
            type: "list",
            choices: ["Yes", "No"],
            name: "restart",
            validate: function validateRestart(name) {
                return name !== '';
            },
        },
    ])
}

async function addRecords() {
    try {
        const add = await userPrompts();

        if (add.add === "Add department(s)") {

        } 
        if (add.add === "Add role(s)") {

        }
        if (add.add === "Add employee(s)") {

        }  
    }
    catch (err) {
        console.log(err);
    };
}
addRecords();

// here is a template calling inquirer, async and if, reuse
async function employeeTeam() {
    try {
        const userInput = await userPrompts();

        if (userInput.restart === "No") {
            console.log(welcome);
            await employeeTeam();
            return;
        };
        console.log("\n================= Have a nice day! ==================");
    }
    catch (err) {
        // // console.log(err);
    };
}
employeeTeam();


// Server is listening
//=================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
