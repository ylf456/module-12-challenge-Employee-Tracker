const inquirer = require("inquirer");
const mysql = require("mysql2");
const initPrompt = require("../index.js");

const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "Sr18,JLqBamboomod",
    database: "employee_db",
  },
  console.log(`Connected to the employee_db database.`)
);

viewDepartment = () => {
  db.query(`SELECT * FROM department;`, function (err, results) {
    console.table(results);
  });
};

viewRoles = () => {
  db.query(
    `SELECT role.id, role.title, role.salary, department.department_name 
    FROM role 
    JOIN department ON role.department_id = department.id;`,
    function (err, results) {
      console.table(results);
    }
  );
  // presented with the job title, role id, the department that role belongs to, and the salary for that role
};

viewEmployees = () => {
  db.query(
    `SELECT employees.id, employees.first_name, employees.last_name, role.title, department.department_name, role.salary, employees.manager_id, CONCAT (employees.first_name," ",employees.last_name) AS manager_name
  FROM employees
  JOIN role ON employees.role_id = role.id 
  JOIN department ON role.department_id = department.id;`,
    function (err, results) {
      console.table(results);
    }
  );
};

addDepartment = (newDepartmentName) => {
  db.query(
    `INSERT INTO department (department_name) VALUES (${newDepartmentName});`,
    function (err, results) {
      console.log("successfully added a new deaprtment");
      initPrompt();
    }
  );
};

addRole = () => {
  db.query(`SELECT * FROM department`, function (err, results) {
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
        db.query(`SELECT * FROM role`, function (err, results) {
          console.log("Updated Role Table:");
          console.table(results);
        });
      });
  });
};

addEmployee = () => {
  db.query(`SELECT * FROM employees`, function (err, results) {
    console.log("please refer to this table while you entering the manager_id;")
    console.table(results);
    inquirer
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
          type: "list",
          name: "newRoleDepartment_id",
          message: "Please choose the department where this role belongs to:",
          choices: ChoiceArray,
        },
      ])
  });
};

updateEmployeeRole = () => {
  db.query(``, function (err, results) {
    console.table(results);
  });
};

module.exports = {
  viewDepartment,
  viewRoles,
  viewEmployees,
  addDepartment,
  addRole,
  updateEmployeeRole,
};

`
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to`;
