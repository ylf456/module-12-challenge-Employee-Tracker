/*
--viewRoles()
--SELECT role.id, role.title, role.salary, department.department_name 
--FROM role 
--JOIN department ON role.department_id = department.id;

--+----+-----------+--------+-----------------+
--| id | title     | salary | department_name |
--+----+-----------+--------+-----------------+
--|  1 | manager   |   1000 | FINANCE         |
--|  2 | analyst   |    900 | AUDIT           |
--|  3 | salesman  |    800 | MARKETING       |
--|  4 | packaging |    700 | PRODUCTION      |
--+----+-----------+--------+-----------------+


--viewDepartments
--SELECT * FROM department

--a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
--viewEmployees
*/

/*
SELECT employees.id, employees.first_name, employees.last_name, role.title, department.department_name, role.salary, employees.manager_id
FROM employees
JOIN role ON employees.role_id = role.id 
JOIN department ON role.department_id = department.id;
*/
/*
+----+------------+-----------+-----------+-----------------+--------+------------+
| id | first_name | last_name | title     | department_name | salary | manager_id |
+----+------------+-----------+-----------+-----------------+--------+------------+
|  1 | Cyprian    | Pankratiy | manager   | FINANCE         |   1000 |          1 |
|  2 | Ridwan     | Cloe      | analyst   | AUDIT           |    900 |          1 |
|  3 | Surendra   | Laurelle  | salesman  | MARKETING       |    800 |          1 |
|  4 | Khﾃ｡nh     | Margit    | packaging | PRODUCTION      |    700 |          1 |
+----+------------+-----------+-----------+-----------------+--------+------------+
*/

INSERT INTO role ( title, salary, department_id) 
VALUES ("new title1", 1000, 1);

SELECT * FROM role;