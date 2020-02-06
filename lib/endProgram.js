const welcome = require("./welcome");
const inquirer = require("inquirer");

function endProgram() {
   console.log("\n===============================================================\n=============== Program ended. Have a nice day ================\n===============================================================\n")
   inquirer.prompt([
      {
         message: "Start Again?",
         type: "list",
         choices: ["Yes", "No"],
         name: "action"
      }
   ])
      .then(answer => {
         switch (answer.action) {
            case "Yes":
               welcome();
               userPrompts();
               break;

            case "No":
               endProgram();
               break;
         }

      });
}

module.exports = endProgram;