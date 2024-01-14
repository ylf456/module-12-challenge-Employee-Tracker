const fs = require("fs");
const inquirer = require("inquirer"); // inquirer@^8.2.4
const mysql = require("mysql2");
const menuChoice = require("./lib/menuChoice");

function prompting() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "menuChoice",
        message:
          "Welcome to the Employee Tracker! Please choose an option from the following menu ",
        choices: [
          "view all departments",
          "view all roles",
          "view all employees",
          "add a department",
          "add a role",
          "add an employee",
          "update an employee role",
        ],
      },
    ])
    .then((result) => {
      //console.log(result);
      console.log("menu: " + result.menuChoice);
      menuChoice(result.menuChoice);
    })
    //.then((result)=> {init()});
};

function init(){
  prompting();
};

init();

module.exports = init;

