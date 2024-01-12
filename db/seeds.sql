INSERT INTO department (id, department_name)
VALUES (1,"FINANCE"),
       (2,"AUDIT"),
       (3,"MARKETING"),
       (4,"PRODUCTION");

INSERT INTO role (id, title, salary, department_id)
VALUE  (1, "manager", 1000, 1),
       (2, "analyst", 900, 2),
       (3, "salesman", 800, 3),
       (4, "packaging", 700, 4); 
    
INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUE (1, "Cyprian", "Pankratiy", 1, 1),
      (2, "Ridwan", "Cloe", 2, 1),
      (3, "Surendra", "Laurelle", 3, 1),
      (4, "Khánh", "Margit", 4, 1);

SELECT * from department;
SELECT * from ROLE;
SELECT * from employees;
