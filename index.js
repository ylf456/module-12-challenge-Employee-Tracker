const fs = require("fs");
const inquirer = require("inquirer"); // inquirer@^8.2.4
const mysql = require("mysql2");
const menuChoice = require("./lib/menuChoice");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "Sr18,JLqBamboomod",
    database: "employee_db",
  },
  console.log(`Connected to the employee_db database.`)
);

async function viewDepartment() {
  db.query(`SELECT * FROM department;`, function (err, results) {
    console.table(results);
    return prompting();
  });
}

async function viewRoles() {
  db.query(
    `SELECT role.id, role.title, role.salary, department.department_name
    FROM role
    JOIN department ON role.department_id = department.id;`,
    function (err, results) {
      console.table(results);
      return prompting();
    }
  );
}

async function viewEmployees() {
  db.query(
    `SELECT e.id,
    e.first_name,
    e.last_name,
    role.title,
    department.department_name,
    role.salary,
    e.manager_id,
    CONCAT(m.first_name, ' ', m.last_name) AS manager_name
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id
JOIN role ON e.role_id = role.id
JOIN department ON role.department_id = department.id;`,
    function (err, results) {
      if (err) throw err;
      console.table(results);
      return prompting();
    }
  );
}

async function addDepartment(newDepartmentName) {
  console.log("New department name:" + newDepartmentName);
  db.query(
    `INSERT INTO department (department_name) VALUES ("${newDepartmentName}");`,
    function (err, results) {
      if (err) throw err;
      console.log("successfully added a new deaprtment");
    }
  );
  db.query(`SELECT * FROM department;`, function (err, results) {
    if (err) throw err;
    console.log("Updated department table: \n-----------------");
    console.table(results);
    return prompting();
  });
}

async function addRole() {
  db.query(`SELECT * FROM department;`, function (err, results) {
    let ChoiceArray = results.map((obj) => `${obj.id}.${obj.department_name}`);
    // console.table(results);
    // console.log(results);
    inquirer
      .prompt([
        {
          type: "input",
          name: "newRoleTitle",
          message: "Please enter the title of this new role: ",
        },
        {
          type: "input",
          name: "newRoleSalary",
          message: "Please enter the salary of this new role: ",
        },
        {
          type: "list",
          name: "newRoleDepartment_id",
          message: "Please choose the department where this role belongs to:",
          choices: ChoiceArray,
        },
      ])
      .then((result) => {
        //console.log(result);
        //console.log(result.newRoleTitle);
        let Dep_id = parseInt(result.newRoleDepartment_id.slice(0, 1));
        let roleSalary = parseInt(result.newRoleSalary);
        //let roleTitle = toString(result.newRoleTitle);
        // console.log(roleTitle);
        // console.log(Dep_id);
        // console.log(roleSalary);
        db.query(
          `INSERT INTO role (title, salary, department_id) VALUES ("${result.newRoleTitle}", ${roleSalary}, ${Dep_id});`,
          function (err, results) {
            if (err) throw err;
            console.log("successfully added one role.");
          }
        );
        db.query(`SELECT * FROM role;`, function (err, results) {
          console.log("Updated Role Table:");
          console.table(results);
          return prompting();
        });
      });
  });
}

async function addEmployee() {
  db.query(`SELECT * FROM employees;`, async function (err, results) {
    console.log(
      "please refer to the tables while you entering the manager_id and role_id;"
    );
    console.log("Employee table:");
    await console.table(results);
  });
  db.query(`SELECT * FROM role;`, async function (err, results_) {
    console.log("role table:");
    await console.table(results_);
  });
  await inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "Please enter the first name of this new employee: ",
      },
      {
        type: "input",
        name: "lastName",
        message: "Please enter the last name of this new employee: ",
      },
      {
        type: "input",
        name: "newRole_id",
        message: "Please refer to the role table for entering the role_id:",
      },

      {
        type: "input",
        name: "newManager_id",
        message:
          "Please refer to the employee table to enter the manager_id of the manager:",
      },
    ])
    .then((result) => {
      db.query(
        `INSERT INTO employees (first_name, last_name, role_id, manager_id)
          VALUES ("${result.firstName}", "${result.lastName}", ${result.newRole_id}, ${result.newManager_id});`,
        function (err, results) {
          if (err) throw err;
          console.log("Successfully added a new employee!");
        }
      );
      db.query(`SELECT * FROM employees;`, function (err, results) {
        console.log("Updated Employee table");
        console.table(results);
        return prompting();
      });
    });
}

async function updateEmployeeRole() {
  db.query(`SELECT * FROM employees;`, function (err, results) {
    if (err) throw err;
    console.log("Employee Table");
    console.table(results);
    db.query(`SELECT * FROM role;`, function (err, results) {
      if (err) throw err;
      console.log("Role Table");
      console.table(results);
    });
    inquirer
      .prompt([
        {
          type: "input",
          name: "id",
          message: "Please refer to the tables for entering the employee id.",
        },
        {
          type: "input",
          name: "firstName",
          message: "Please enter the first name for this employee.",
        },
        {
          type: "input",
          name: "LastName",
          message: "Please enter the last name for this employee.",
        },
        {
          type: "input",
          name: "roleID",
          message: "Please refer to the role table for entering the role id",
        },
        {
          type: "input",
          name: "managerID",
          message:
            "Please refer to the employees table for entering the manager id",
        },
      ])
      .then((result) => {
        let IDnum = parseInt(result.id);
        db.query(
          `UPDATE employees
      SET first_name="${result.firstName}",
      last_name="${result.LastName}",
      role_id=${result.roleID},
      manager_id=${result.managerID}
      WHERE id=?;`, IDnum,
          function (err, results) {
            if (err) throw err;
            console.log("Successfully updated an employee!");
            db.query(`SELECT * FROM employees;`, function (err, results) {
              console.log("Updated employees Table: \n------------------------------")
              console.table(results);
              return prompting();
            
            });
          }
        );
      });
  });
}

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
      //menuChoice(result.menuChoice);
      if (result.menuChoice === "add a department") {
        inquirer
          .prompt([
            {
              type: "input",
              name: "newDepartmentName",
              message: "Please enter the name of this new department",
            },
          ])
          .then((result) => addDepartment(result.newDepartmentName));
      } else if (result.menuChoice === "add a role") {
        addRole();
      } else if (result.menuChoice === "add an employee") {
        addEmployee();
      } else if (result.menuChoice === "update an employee role") {
        updateEmployeeRole();
      } else if (result.menuChoice === "view all departments") {
        viewDepartment();
      } else if (result.menuChoice === "view all roles") {
        viewRoles();
      } else if (result.menuChoice === "view all employees") {
        viewEmployees();
      } else {
        console.error("error: please check the option list");
        return prompting();
      }
    });
  //.then((result)=> {init()});
}

function init() {
  prompting();
}

init();

//module.exports = prompting;
