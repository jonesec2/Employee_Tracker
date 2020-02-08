const welcome = require('./lib/welcome');
const endProgram = require('./endProgram');
const addRecord = require('./addRecord');
const inquirer = require ('inquirer');

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

module.exports = userPrompts;