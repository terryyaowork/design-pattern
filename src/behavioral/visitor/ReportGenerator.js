const ReportVisitor = require('./ReportVisitor');

class ReportGenerator extends ReportVisitor {
  visitEmployee(employee) {
    console.log(`Employee: ${employee.name}, Department: ${employee.department}, Position: ${employee.position}`);
  }

  visitSalesData(sale) {
    console.log(`Sales Person: ${sale.salesPerson}, Total Sales: ${sale.totalSales}`);
  }
}

module.exports = ReportGenerator;
