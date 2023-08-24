const inquirer = require('inquirer');
const { connection } = require('./db');
const queries = require('./utils/queries');
const { viewEmployeesByManagerMenu } = require('./utils/queries');


// 'employee manager' sign
console.log(`  
  ____|                    |                               __ __|                  |                
  __|    __ \`__ \\   __ \\   |   _ \\   |   |   _ \\   _ \\        |   __|  _\` |   __|  |  /   _ \\   __| 
  |      |   |   |  |   |  |  (   |  |   |   __/   __/        |  |    (   |  (       <    __/  |    
 _____| _|  _|  _|  .__/  _| \\___/  \\__, | \\___| \\___|       _| _|   \\__,_| \\___| _|\\_\\ \\___| _| 
`);


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
          'View employees by manager',
          'View employees by department',
          'Delete data',
          'View department budgets',
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
        case 'View employees by manager':
          viewEmployeesByManager();
          break;
        case 'View employees by department':
          viewEmployeesByDepartment();
          break;
        case 'Delete data':
          deleteData();
          break;
        case 'View department budgets':
          viewDepartmentBudget();
          break;
        // Add other choices here
      }
    });
}

// view all departments
async function viewDepartments() {
  try {
    const departments = await queries.getAllDepartments();
    console.table(departments);
    startApp();
  } catch (error) {
    console.error('Error viewing departments:', error);
  }
}
//  view all roles
async function viewRoles() {
  try {
    const roles = await queries.getAllRoles();
    console.log(roles); 
    console.table(roles);
    startApp();
  } catch (error) {
    console.error('Error viewing roles:', error);
  }
}

// view all employees
async function viewEmployees() {
  try {
    const employees = await queries.getAllEmployees();
    console.table(employees);
    startApp();
  } catch (error) {
    console.error('Error viewing employees:', error);
  }
}

//  add a department
async function addDepartment() {
  try {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'departmentName',
        message: "Enter the department's name:"
      }
    ]);

    await queries.addDepartment(answers.departmentName);
    console.log('Department added successfully!');
    startApp();
  } catch (error) {
    console.error('Error adding department:', error);
  }
}

//  add a role
async function addRole() {
  try {
    const departments = await queries.getAllDepartments();
    const departmentChoices = departments.map(department => ({
      name: department.name,
      value: department.id
    }));

    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'roleName',
        message: "Enter the role's name:"
      },
      {
        type: 'input',
        name: 'salary',
        message: "Enter the role's salary:"
      },
      {
        type: 'list',
        name: 'department',
        message: "Select the role's department:",
        choices: departmentChoices
      }
    ]);

    await queries.addRole(answers.roleName, answers.salary, answers.department);
    console.log('Role added successfully!');
    startApp();
  } catch (error) {
    console.error('Error adding role:', error);
  }
}

// add an employee
async function addEmployee() {
  try {
    const roles = await queries.getAllRoles();
    const employees = await queries.getAllEmployees();
    const employeeChoices = employees.map(employee => ({
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id
    }));
    employeeChoices.unshift({ name: 'No Manager', value: null });

    const roleChoices = roles.map(role => ({
      name: role.title,
      value: role.id
    }));

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
        name: 'role',
        message: "Select the employee's role:",
        choices: roleChoices
      },
      {
        type: 'list',
        name: 'manager',
        message: "Select the employee's manager:",
        choices: employeeChoices
      }
    ]);

    await queries.addEmployee(
      answers.firstName,
      answers.lastName,
      answers.role,
      answers.manager
    );
    console.log('Employee added successfully!');
    startApp();
  } catch (error) {
    console.error('Error adding employee:', error);
  }
}

// update an employee role
async function updateEmployeeRole() {
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
        name: 'role',
        message: 'Select the new role for the employee:',
        choices: roleChoices
      }
    ]);

    await queries.updateEmployeeRole(answers.employeeId, answers.role);
    console.log('Employee role updated successfully!');
    startApp();
  } catch (error) {
    console.error('Error updating employee role:', error);
  }
}

  // bonus section here 

//  employees by manager 
async function viewEmployeesByManagerMenu() {
  try {
    // list to select a manager
    const managers = await queries.getAllEmployeesByManager();
    const managerChoices = managers.map((manager) => ({
      name: manager.manager_name,
      value: manager.manager_id,
    }));

    const selectedManager = await inquirer.prompt([
      {
        type: 'list',
        name: 'managerId',
        message: 'Select a manager to view employees:',
        choices: managerChoices,
      },
    ]);

    // display employees by manager user has selevected 
    const employeesByManager = await queries.getAllEmployeesByManager(
      selectedManager.managerId
    );
    console.table(employeesByManager);

    startApp(); 
  } catch (error) {
    console.error('Error viewing employees by manager:', error);
  }
}

// view employees by department
async function viewEmployeesByDepartment() {
  try {
    // Existing code for viewing employees by department

    startApp();
  } catch (error) {
    console.error('Error viewing employees by department:', error);
  }
}

// deletion section

  async function deleteData() {
    try {
      const dataToDelete = await inquirer.prompt([
        {
          type: 'list',
          name: 'dataType',
          message: 'Select the data type to delete:',
          choices: ['Department', 'Role', 'Employee']
        }
      ]);
  
      if (dataToDelete.dataType === 'Department') {
        const departments = await queries.getAllDepartments();
        const departmentChoices = departments.map(department => ({
          name: department.name,
          value: department.id
        }));
  
        const answer = await inquirer.prompt([
          {
            type: 'list',
            name: 'departmentId',
            message: 'Select the department to delete:',
            choices: departmentChoices
          }
        ]);
  
        await queries.deleteDepartment(answer.departmentId);
        console.log('Department deleted successfully!');
      } else if (dataToDelete.dataType === 'Role') {
        const roles = await queries.getAllRoles();
        const roleChoices = roles.map(role => ({
          name: role.title,
          value: role.id
        }));
  
        const answer = await inquirer.prompt([
          {
            type: 'list',
            name: 'roleId',
            message: 'Select the role to delete:',
            choices: roleChoices
          }
        ]);
  
        await queries.deleteRole(answer.roleId);
        console.log('Role deleted successfully!');
      } else if (dataToDelete.dataType === 'Employee') {
        const employees = await queries.getAllEmployees();
        const employeeChoices = employees.map(employee => ({
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id
        }));
  
        const answer = await inquirer.prompt([
          {
            type: 'list',
            name: 'employeeId',
            message: 'Select the employee to delete:',
            choices: employeeChoices
          }
        ]);
  
        await queries.deleteEmployee(answer.employeeId);
        console.log('Employee deleted successfully!');
      } else {
        console.log('Invalid data type selected.');
      }
  
      startApp();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  }
  
  // Start application
  startApp();