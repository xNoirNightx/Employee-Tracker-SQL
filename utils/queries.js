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

module.exports = {
  getAllDepartments,
  getAllRoles,
  getAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole
};