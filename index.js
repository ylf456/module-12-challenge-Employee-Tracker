const fs = require("fs");
const inquirer = require("inquirer"); // inquirer@^8.2.4
const mysql = require("mysql2");
//const showTable = { nestTables: true };
const menuChoice = require("./lib/menuChoice");
//use console.table to show the table instead of showing an array of object(using console.log)

prompting = () => {
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

init = () => {
  prompting();
};

init();

module.exports = init;

`md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
`;

/*
if (result.menuChoice === "add a department" || result.menuChoice === "add a role"
            || result.menuChoice === "add an employee" || result.menuChoice === "update an employee role") {
            query = new updateDBFunc(result.menuChoice);
        } else { 
            query = new viewFunc(result.menuChoice);
            eval(query);
        }
*/
//const express = require('express');
//const viewFunc = require('./lib/viewDB.js');
//const updateDBFunc = require("./lib/updateDB.js")
//const sequelize = require('./config/connection');
/*
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
*/
