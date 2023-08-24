// Connect to MySQL
const connection = require('../sql/connect.js');

// Get all departments from the database
async function getAllDepartments() {
  try {
    const [results] = await connection.promise().query('SELECT * FROM department');
    return results;
  } catch (error) {
    throw error;
  }
}

// Get all roles from the database
async function getAllRoles() {
  try {
    const [results] = await connection.promise().query('SELECT * FROM role');
    return results;
  } catch (error) {
    throw error;
  }
}

// Get all employees from the database
async function getAllEmployees() {
  try {
    const [results] = await connection.promise().query('SELECT * FROM employee');
    return results;
  } catch (error) {
    throw error;
  }
}

// Add a new department to the database
async function addDepartment(name) {
  try {
    const query = 'INSERT INTO department (name) VALUES (?)';
    const [result] = await connection.promise().query(query, [name]);
    return result;
  } catch (error) {
    throw error;
  }
}

// Add a new role to the database
async function addRole(title, salary, departmentId) {
  try {
    const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
    const [result] = await connection.promise().query(query, [title, salary, departmentId]);
    return result;
  } catch (error) {
    throw error;
  }
}

// Add a new employee to the database
async function addEmployee(firstName, lastName, roleId, managerId) {
  try {
    const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
    const [result] = await connection.promise().query(query, [firstName, lastName, roleId, managerId]);
    return result;
  } catch (error) {
    throw error;
  }
}

// Update an employee's role in the database
async function updateEmployeeRole(employeeId, roleId) {
  try {
    const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
    const [result] = await connection.promise().query(query, [roleId, employeeId]);
    return result;
  } catch (error) {
    throw error;
  }
}

// bonus queries  *** add all to prompts *** 
// update employee's manager 
async function updateEmployeeManager(employeeId, managerId) {
  try {
    const query = 'UPDATE employee SET manager_id = ? WHERE id = ?';
    await connection.promise().query(query, [managerId, employeeId]);
  } catch (error) {
    throw error;
  }
}

// employees by manager
async function getAllEmployeesByManager() {
  try {
    const query = 'SELECT manager_id, CONCAT(manager.first_name, " ", manager.last_name) AS manager_name, ' +
                  'GROUP_CONCAT(CONCAT(employee.first_name, " ", employee.last_name)) AS employees ' +
                  'FROM employee ' +
                  'LEFT JOIN employee AS manager ON employee.manager_id = manager.id ' +
                  'GROUP BY manager_id';
    const results = await connection.promise().query(query);
    return results[0];
  } catch (error) {
    throw error;
  }
}

// employees by department
async function getAllEmployeesByDepartment() {
  try {
    const query = 'SELECT department.name AS department_name, ' +
                  'GROUP_CONCAT(CONCAT(employee.first_name, " ", employee.last_name)) AS employees ' +
                  'FROM employee ' +
                  'LEFT JOIN role ON employee.role_id = role.id ' +
                  'LEFT JOIN department ON role.department_id = department.id ' +
                  'GROUP BY department.name';
    const results = await connection.promise().query(query);
    return results[0];
  } catch (error) {
    throw error;
  }
}

// budget of each department
async function calculateDepartmentBudget() {
  try {
    const query = 'SELECT department.name AS department_name, SUM(role.salary) AS utilized_budget ' +
                  'FROM employee ' +
                  'LEFT JOIN role ON employee.role_id = role.id ' +
                  'LEFT JOIN department ON role.department_id = department.id ' +
                  'GROUP BY department.name';
    const results = await connection.promise().query(query);
    return results[0];
  } catch (error) {
    throw error;
  }
}

// bonus deletion section **** add to prompts ***
// delete department 
async function deleteDepartment(departmentId) {
  const query = 'DELETE FROM department WHERE id = ?';
  await executeQuery(query, [departmentId]);
}

// delete a role 
async function deleteRole(roleId) {
  const query = 'DELETE FROM role WHERE id = ?';
  await executeQuery(query, [roleId]);
}

// delete an employee 
async function deleteEmployee(employeeId) {
  const query = 'DELETE FROM employee WHERE id = ?';
  await executeQuery(query, [employeeId]);
}


module.exports = {
  getAllDepartments,
  getAllRoles,
  getAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
  updateEmployeeManager,
  getAllEmployeesByManager,
  getAllEmployeesByDepartment,
  calculateDepartmentBudget,
  deleteDepartment,
  deleteRole,
  deleteEmployee
};