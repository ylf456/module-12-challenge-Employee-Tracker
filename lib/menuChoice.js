{ } = require('./queryFunc.js');

menuChoiceChecker =(menuChoice) =>{
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
      console.table(results);
    });
  }
 
}

module.exports = menuChoice;