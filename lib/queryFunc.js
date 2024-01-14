const inquirer = require("inquirer");
const mysql = require("mysql2");
const initPrompt = require("../index.js");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
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
};

viewEmployees = () => {
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
      db.query(`SELECT * FROM employee;`, function (err, results) {
        console.log("Updated Employee table");
        console.table(results);
      });
    });
}

updateEmployeeRole = () => {
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
        db.query(
          `UPDATE employees
      SET first_name = "${result.firstName}"
      SET last_name = "${result.lastName}"
      SET role_id = "${result.roleID}"
      SET manager_id = "${result.managerID}"
      WHERE id = ${result.id};`,
          function (err, results) {
            if (err) throw err;
            console.log("Successfully updated an employee!");
            db.query(`SELECT * FROM employees;`, function (err, results) {
              console.table(results);
            });
          }
        );
      });
  });
};

module.exports = {
  viewDepartment,
  viewRoles,
  viewEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
};
