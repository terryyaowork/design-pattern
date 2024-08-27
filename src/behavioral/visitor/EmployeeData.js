class EmployeeData {
  constructor(employees) {
    this.employees = employees;
  }

  async accept(visitor) {
    const employeePromises = this.employees.map(async (employee) => {
      if (!employee.id || !employee.name || !employee.department || !employee.position) {
        console.warn('Invalid employee data');
      } else {
        await visitor.visitEmployee(employee);
      }
    });
    
    await Promise.all(employeePromises); // 確保所有訪問操作都完成
  }

  getEmployees() {
    return this.employees;
  }
}

module.exports = EmployeeData;
