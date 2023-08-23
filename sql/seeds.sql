-- Creating the departments
INSERT INTO department (name)
VALUES ('Engineering'), ('Sales'), ('Marketing'), ('Finance');

-- Create a few basic roles
INSERT INTO role (title, salary, department_id)
VALUES
  ('Software Engineer', 80000, 1),
  ('Front-end Developer', 75000, 1),
  ('Back-end Developer', 75000, 1),
  ('Sales Manager', 90000, 2),
  ('Sales Representative', 60000, 2),
  ('Marketing Manager', 85000, 3),
  ('Marketing Coordinator', 60000, 3),
  ('Financial Analyst', 80000, 4),
  ('Accountant', 70000, 4),
  ('Financial Manager', 90000, 4);

-- Create the employees
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Error', '404', 1, NULL),
  ('Async', 'Await', 2, 1),
  ('Bug', 'Hunter', 3, 1),
  ('Nully', 'Pointer', 4, NULL),
  ('Infinite', 'Looper', 5, 4),
  ('Syntax', 'Error', 6, 4),
  ('NoSQL', 'Master', 7, 4),
  ('Code', 'Wizard', 8, NULL),
  ('Git', 'Commit', 9, 8),
  ('Loop', 'Ranger', 10, 8);