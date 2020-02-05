{
    message: "What would you like to add?",
    type: "list",
    choices: ["Add department(s)", "Add role(s)", "Add employee(s)"],
    name: "create",
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
// {
//     message: "Are you done? Yes to end, no to start over.",
//     type: "list",
//     choices: ["Yes", "No"],
//     name: "restart"
// },