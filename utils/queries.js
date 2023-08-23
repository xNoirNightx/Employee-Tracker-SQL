// connect to mysql
const connection=require ( '../sql/connect.js' )

// get all departments from the database
function getAllDepartments() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM department', (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
  
  // get all roles from the database
  function getAllRoles() {
   
  }
  
  // get all employees from the database
  function getAllEmployees() {
    
  }
  
  // add a new department to the database
  function addDepartment(name) {

  }
  
  // add a new role to the database
  function addRole(title, salary, departmentId) {
  
  }
  
  // add a new employee to the database
  function addEmployee(firstName, lastName, roleId, managerId) {
   
  }
  
  //  update an employee's role in the database
  function updateEmployeeRole(employeeId, roleId) {
    
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