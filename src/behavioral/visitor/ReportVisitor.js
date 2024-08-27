class ReportVisitor {
    visitEmployeeData(employeeData) {
      throw new Error('This method should be implemented in the subclass');
    }
  
    visitSalesData(salesData) {
      throw new Error('This method should be implemented in the subclass');
    }
  }
  
  module.exports = ReportVisitor;
  