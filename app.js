const inquirer = require('inquirer');
const { connection } = require('./db');

//  start the application
function startApp() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'How may I assist you?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          // Add other options
        ]
      }
    ])
    .then(answer => {
      switch (answer.action) {
        case 'View all departments':
          viewDepartments();
          break;
        case 'View all roles':
          viewRoles();
          break;
        case 'View all employees':
          viewEmployees();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Update an employee role':
          updateEmployeeRole();
          break;
        // add other choices here
      }
    });
}

// view all departments
function viewDepartments() {
  
}

//  view all roles
function viewRoles() {
 
}

// view all employees
function viewEmployees() {
  
}

//  add a department
function addDepartment() {
 
}

//  add a role
function addRole() {
  
}

// add an employee
function addEmployee() {

}

// update an employee role
function updateEmployeeRole() {
 
}

// Start application
startApp();