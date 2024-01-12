const fs = require("fs");
const inquirer = require("inquirer"); // inquirer@^8.2.4
const mysql = require("mysql2");
//const showTable = { nestTables: true };
const menuChoice = require('./lib/menuChoice')
//use console.table to show the table instead of showing an array of object(using console.log)
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "Sr18,JLqBamboomod",
    database: "employee_db",
  },
  console.log(`Connected to the books_db database.`)
);

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
    
      if (result.menuChoice === "add a department") {
        inquirer
          .prompt([
            {
              type: "input",
              name: "departmentName",
              message: "Please enter department name",
            },
          ])
          .then((result) => {
            console.log(`new department name: ${result.departmentName}`);
            db.query(
              `INSERT INTO department (name) VALUES (${result.departmentName});`,
              function (err, results) {
                console.log(results);
              }
            );
            db.query(`SELECT * FROM department;`, function (err, results) {
              console.log(results);
            });
          });
      } else if (result.menuChoice === "add a role") {
        inquirer
          .prompt([
            {
              type: "input",
              name: "roleName",
              message: "Please enter the title of this role",
            },
            {
              type: "input",
              name: "salary",
              message: "Please enter the salary of this role",
            },
          ])
          .then((result) => {
            db.query(`SELECT * FROM department;`, function (err, results) {
              console.log(
                "Please enter the enter the id of the department where you want to add the role to. referring to the table given in the console:"
              );
              console.log(results);
              let departmentArray = [];

              (results) => departmentArray.push(result);
            });
            inquirer.prompt([
              {
                type: "input",
                name: "roleName",
                message: "Please enter the title of this role",
              },
            ]);
          });
      } else if (result.menuChoice === "add an employee") {
      } else if (result.menuChoice === "update an employee role") {
      } else if (result.menuChoice === "view all departments") {
        db.query(`SELECT * FROM department;`,showTable, function (err, results) {
          console.log(results);
        });
      }
  return;  });
};

function init() {
  prompting();
}

init();

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