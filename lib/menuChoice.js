const {
  viewDepartment,
  viewRoles,
  viewEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
} = require("./queryFunc.js");
const inquirer = require("inquirer");
const initPrompt = require("../index.js");

menuChoiceChecker = (menuChoice) => {
  if (menuChoice === "add a department") {
    inquirer
      .prompt([
        {
          type: "input",
          name: "newDepartmentName",
          message: "Please enter the name of this new department",
        },
      ])
      .then((result) => addDepartment(result.newDepartmentName));
  } else if (menuChoice === "add a role") {
    addRole();
  } else if (menuChoice === "add an employee") {
    addEmployee();
  } else if (menuChoice === "update an employee role") {
    updateEmployeeRole();
  } else if (menuChoice === "view all departments") {
    viewDepartment();
  } else if (menuChoice === "view all roles") {
    viewRoles();
  } else if (menuChoice === "view all employees") {
    viewEmployees();
  } else {
    console.error("error: please check the option list");
    return initPrompt();
  }
};

module.exports = menuChoiceChecker;
