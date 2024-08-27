class SalesData {
  constructor(sales) {
    this.sales = sales;
  }

  async accept(visitor) {
    const salesPromises = this.sales.map(async (sale) => {
      if (!sale.id || !sale.salesPerson || !sale.totalSales) {
        console.warn('Invalid sales data');
      } else {
        await visitor.visitSalesData(sale);
      }
    });
    
    await Promise.all(salesPromises); // 確保所有訪問操作都完成
  }

  getSales() {
    return this.sales;
  }
}

module.exports = SalesData;
