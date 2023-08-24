const inquirer = require('inquirer');
const queries = require('./queries'); 

// view all departments
async function promptViewAllDepartments() {
  try {
    const departments = await queries.getAllDepartments();
    console.table(departments);
  } catch (error) {
    console.error('Error:', error);
  }
}

//  view all roles
async function promptViewAllRoles() {
  try {
    const roles = await queries.getAllRoles();
    console.table(roles);
  } catch (error) {
    console.error('Error:', error);
  }
}

// view all employees
async function promptViewAllEmployees() {
  try {
    const employees = await queries.getAllEmployees();
    console.table(employees);
  } catch (error) {
    console.error('Error:', error);
  }
}

// add a department
async function promptAddDepartment() {
  try {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter the name of the new department:'
      }
    ]);
    await queries.addDepartment(answers.name);
    console.log('Department added successfully!');
  } catch (error) {
    console.error('Error adding department:', error);
  }
}

// add a role
async function promptAddRole() {
  try {
    const departments = await queries.getAllDepartments();
    const departmentChoices = departments.map(department => ({
      name: department.name,
      value: department.id
    }));

    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Enter the title of the new role:'
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Enter the salary of the new role:'
      },
      {
        type: 'list',
        name: 'departmentId',
        message: 'Select the department for the new role:',
        choices: departmentChoices
      }
    ]);

    await queries.addRole(answers.title, answers.salary, answers.departmentId);
    console.log('Role added successfully!');
  } catch (error) {
    console.error('Error adding role:', error);
  }
}

// add an employee
async function promptAddEmployee() {
  try {
    const roles = await queries.getAllRoles();
    const roleChoices = roles.map(role => ({
      name: role.title,
      value: role.id
    }));

    // employee details 
    const employees = await queries.getAllEmployees();
    const managerChoices = employees.map(employee => ({
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id
    }));
    managerChoices.push({ name: 'No Manager', value: null });

    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'firstName',
        message: "Enter the employee's first name:"
      },
      {
        type: 'input',
        name: 'lastName',
        message: "Enter the employee's last name:"
      },
      {
        type: 'list',
        name: 'roleId',
        message: "Select the employee's role:",
        choices: roleChoices
      },
      {
        type: 'list',
        name: 'managerId',
        message: "Select the employee's manager:",
        choices: managerChoices
      }
    ]);

    await queries.addEmployee(answers.firstName, answers.lastName, answers.roleId, answers.managerId);
    console.log('Employee added successfully!');
  } catch (error) {
    console.error('Error adding employee:', error);
  }
}

// update an employee's role
async function promptUpdateEmployeeRole() {
  try {
    const employees = await queries.getAllEmployees();
    const employeeChoices = employees.map(employee => ({
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id
    }));

    const roles = await queries.getAllRoles();
    const roleChoices = roles.map(role => ({
      name: role.title,
      value: role.id
    }));

    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'employeeId',
        message: 'Select the employee whose role you want to update:',
        choices: employeeChoices
      },
      {
        type: 'list',
        name: 'roleId',
        message: 'Select the new role for the employee:',
        choices: roleChoices
      }
    ]);

    await queries.updateEmployeeRole(answers.employeeId, answers.roleId);
    console.log('Employee role updated successfully!');
  } catch (error) {
    console.error('Error updating employee role:', error);
  }
}

// bonus prompts here  



module.exports = {
  promptViewAllDepartments,
  promptViewAllRoles,
  promptViewAllEmployees,
  promptAddDepartment,
  promptAddRole,
  promptAddEmployee,
  promptUpdateEmployeeRole
  // ... add more prompt exports ...
};