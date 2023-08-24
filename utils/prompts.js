const inquirer = require('inquirer');
const queries = require('./queries');

//  view all departments
async function promptViewAllDepartments() {
    try {
      const departments = await queries.getAllDepartments();
      console.table(departments);
    } catch (error) {
      console.error('Error:', error);
    }
  }