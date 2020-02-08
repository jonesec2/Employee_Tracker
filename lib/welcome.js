const userPrompts = require('./userPrompts')

function welcome() {
    console.log( "\n===============================================================\n=============== Welcome to the Employee Tracker ===============\n===============================================================\n");
    userPrompts();
}

module.exports = welcome;