//=================================================
const express = require("express");
const path = require("path");
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "",
    database: "top_songsDB"
});


//=================================================
const app = express();
const PORT = process.env.PORT || 3000;

//=================================================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//=================================================

// here is an inquirer template, reuse this
function userPrompts() {
    return inquirer.prompt([
        {
            message: "What is the employee's role?",
            type: "list",
            choices: ["Manager", "Engineer", "Intern"],
            name: "role"
        },
        {
            message: "What is the Manager's Office Number?",
            type: "string",
            name: "officeNumber",
            validate: function validateNumber(officeNumber) {
                return officeNumber !== '';
            },
            when: function (answer) {
                return answer.role === "Manager";
            }
        },
        {
            message: "If you need to add more members, select Yes. Otherwise select No and we'll generate your team profile.",
            type: "list",
            choices: ["Yes", "No"],
            name: "restart",
            validate: function validateRestart(name) {
                return name !== '';
            },
        },
    ])
}


// here is a template calling inquirer, async and if, reuse
async function employeeTeam() {
    try {
        const userInput = await userPrompts();

        teamMembies.push(roleResolver(userInput));

        if (userInput.restart === "Yes") {
            console.log("Member Added")
            await employeeTeam();
            return;
        };
        console.log("Gathering your team!");

    }
    catch (err) {
        console.log(err);
    };
}
employeeTeam();

// Server is listening
//=================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
