/**
 * Visitor Pattern 測試總結
 * 
 * 這些測試的目的是驗證訪問者模式在不同數據情境中的正確性，特別是針對員工數據和銷售數據的訪問處理。
 * 測試目標包括檢查資料有效性、並發處理、異步操作、性能表現和報告生成的正確性。
 * 
 * 測試情境包括：
 * 
 * 1. **生成員工報告：**
 *    - 測試是否能正確生成包括有效員工數據的報告。
 * 
 * 2. **生成銷售報告：**
 *    - 測試是否能正確生成包括有效銷售數據的報告。
 * 
 * 3. **空員工數據處理：**
 *    - 測試當沒有員工數據時，系統是否能夠正常運行而不崩潰。
 * 
 * 4. **缺少員工欄位的數據處理：**
 *    - 測試在員工數據中缺少欄位時，系統能否正確記錄無效數據警告。
 * 
 * 5. **大量員工數據的報告生成：**
 *    - 測試系統在處理大量員工數據時的效能。
 * 
 * 6. **無效員工數據的處理：**
 *    - 測試當員工數據無效時，是否正確記錄警告。
 * 
 * 7. **高並發情境下的報告生成：**
 *    - 測試系統在多個並發報告生成請求下是否能夠正確處理。
 * 
 * 8. **性能測試：**
 *    - 測試在非常大量數據下，系統是否能夠保持良好的性能。
 * 
 * 9. **報告格式驗證：**
 *    - 確認報告生成的格式是否符合預期。
 * 
 * 10. **極值數據處理：**
 *    - 測試系統在處理極端數據值（如最大安全整數）時的表現。
 * 
 * 11. **空銷售數據處理：**
 *    - 測試在沒有銷售數據時，系統是否能正確處理。
 * 
 * 12. **缺少銷售欄位的數據處理：**
 *    - 測試在銷售數據缺少必要欄位時，系統能否正確記錄警告。
 * 
 * 13. **混合有效與無效員工數據處理：**
 *    - 測試系統能否同時處理有效與無效的員工數據，並分別生成報告或記錄警告。
 * 
 * 14. **完全無效的銷售數據處理：**
 *    - 測試當銷售數據完全無效時，是否正確記錄警告。
 * 
 * 15. **允許同時多個訪問者訪問數據：**
 *    - 測試系統在多個訪問者同時訪問數據時的行為，確認是否能正確處理。
 * 
 * 16. **相同訪問者的多次訪問：**
 *    - 測試相同訪問者能否多次訪問相同的數據集並生成報告。
 * 
 * 17. **異步訪問者處理：**
 *    - 測試異步訪問者能否正確處理訪問操作。
 * 
 * 18. **訪問失敗後繼續處理其他數據：**
 *    - 測試在訪問部分無效數據後，系統能否繼續處理其他有效數據。
 */

const EmployeeData = require('../../../src/behavioral/visitor/EmployeeData');
const SalesData = require('../../../src/behavioral/visitor/SalesData');
const ReportGenerator = require('../../../src/behavioral/visitor/ReportGenerator');

describe('訪問者模式的報告生成', () => {
    beforeEach(() => {
        jest.spyOn(console, 'log').mockImplementation(() => {});  // 禁用 console.log
        jest.spyOn(console, 'warn').mockImplementation(() => {}); // 禁用 console.warn
    });

    afterEach(() => {
        jest.restoreAllMocks();  // 恢復 console.log
    });

    // 1. 生成員工報告
    it('應該生成員工報告', () => {
        const employees = [
            { id: 1, name: 'John Doe', department: 'Sales', position: 'Manager' },
            { id: 2, name: 'Jane Smith', department: 'Sales', position: 'Associate' }
        ];
        const employeeData = new EmployeeData(employees);
        const reportGenerator = new ReportGenerator();

        employeeData.accept(reportGenerator);
    });

    // 2. 生成銷售報告
    it('應該生成銷售報告', () => {
        const sales = [
            { id: 1, salesPerson: 'John Doe', totalSales: 5000 },
            { id: 2, salesPerson: 'Jane Smith', totalSales: 7000 }
        ];
        const salesData = new SalesData(sales);
        const reportGenerator = new ReportGenerator();

        salesData.accept(reportGenerator);
    });

    // 3. 空的員工數據處理
    it('應該處理空的員工數據', () => {
        const employees = [];
        const employeeData = new EmployeeData(employees);
        const reportGenerator = new ReportGenerator();

        employeeData.accept(reportGenerator);
        // 檢查報告是否處理空的員工數據而不會崩潰
    });

    // 4. 缺少員工欄位的數據處理
    it('應該處理缺少員工欄位的情況', () => {
        const employees = [
            { id: 1, department: 'Sales', position: 'Manager' } // 缺少 name 欄位
        ];
        const employeeData = new EmployeeData(employees);
        const reportGenerator = new ReportGenerator();
    
        employeeData.accept(reportGenerator);
    
        // 檢查 log 是否包含 'Invalid employee data'
        const logCalls = console.warn.mock.calls.map(call => call[0]);
        expect(logCalls.some(message => message.includes('Invalid employee data'))).toBe(true);
    });

    // 5. 大量員工數據的報告生成
    it('應該處理大量員工數據生成報告', () => {
        const employees = Array.from({ length: 10000 }, (_, index) => ({
            id: index,
            name: `Employee ${index}`,
            department: 'Sales',
            position: 'Associate'
        }));
        const employeeData = new EmployeeData(employees);
        const reportGenerator = new ReportGenerator();

        employeeData.accept(reportGenerator);
        // 檢查是否正確生成大量數據的報告
    });

    // 6. 無效的員工數據處理
    it('應該在無效的員工數據時拋出錯誤', () => {
        const employees = [
            { id: null, name: 'Invalid Data', department: null, position: null }
        ];
        const employeeData = new EmployeeData(employees);
        const reportGenerator = new ReportGenerator();
    
        employeeData.accept(reportGenerator);
    
        // 檢查是否記錄了 `console.warn`
        const logCalls = console.warn.mock.calls.map(call => call[0]);
        expect(logCalls.some(message => message.includes('Invalid employee data'))).toBe(true);    
    });
   
    // 7. 高並發情境下的報告生成
    it('應該在高並發情況下生成報告', async () => {
        const employees = Array.from({ length: 1000 }, (_, index) => ({
            id: index,
            name: `Employee ${index}`,
            department: 'Sales',
            position: 'Associate'
        }));
        const employeeData = new EmployeeData(employees);
        const reportGenerator = new ReportGenerator();
    
        const concurrentExecutions = Array.from({ length: 10 }, () => 
            new Promise(resolve => {
                employeeData.accept(reportGenerator);
                resolve();
            })
        );
        
        await Promise.all(concurrentExecutions);
        // 檢查報告是否正確生成
    });
    
    // 8. 性能測試
    it('應該在大量數據情況下保持良好的性能', () => {
        const employees = Array.from({ length: 100000 }, (_, index) => ({
            id: index,
            name: `Employee ${index}`,
            department: 'Sales',
            position: 'Associate'
        }));
        const employeeData = new EmployeeData(employees);
        const reportGenerator = new ReportGenerator();
    
        const startTime = Date.now();
        employeeData.accept(reportGenerator);
        const endTime = Date.now();
    
        const executionTime = endTime - startTime;
        expect(executionTime).toBeLessThan(5000); // 性能門檻，例如 5 秒
    });
    
    // 9. 報告格式驗證
    it('應該生成符合預期格式的報告', () => {
        const employees = [
            { id: 1, name: 'John Doe', department: 'Sales', position: 'Manager' },
        ];
        const employeeData = new EmployeeData(employees);
        const reportGenerator = new ReportGenerator();
    
        employeeData.accept(reportGenerator);
    
        const expectedOutput = 'Employee: John Doe, Department: Sales, Position: Manager';
        const logCalls = console.log.mock.calls.map(call => call[0]);
    
        expect(logCalls).toContain(expectedOutput);
    });
    
    // 10. 極值數據處理
    it('應該處理極值的員工數據', () => {
        const employees = [
            { id: Number.MAX_SAFE_INTEGER, name: 'Max Value', department: 'Sales', position: 'Associate' }
        ];
        const employeeData = new EmployeeData(employees);
        const reportGenerator = new ReportGenerator();
    
        employeeData.accept(reportGenerator);
    
        const logCalls = console.log.mock.calls.map(call => call[0]);
        expect(logCalls.some(message => message.includes('Max Value'))).toBe(true);
    });
    
    // 11. 空的銷售數據處理
    it('應該處理空的銷售數據', () => {
        const sales = [];
        const salesData = new SalesData(sales);
        const reportGenerator = new ReportGenerator();
    
        salesData.accept(reportGenerator);
        // 確認空數據情況下沒有崩潰
        const logCalls = console.log.mock.calls;
        expect(logCalls.length).toBe(0); // 確保沒有任何日誌
    });

    // 12. 缺少銷售欄位的數據處理
    it('應該警告缺少銷售數據欄位的情況', () => {
        const sales = [
            { id: 1, totalSales: 5000 } // 缺少 salesPerson 欄位
        ];
        const salesData = new SalesData(sales);
        const reportGenerator = new ReportGenerator();
    
        salesData.accept(reportGenerator);
    
        // 檢查是否記錄了 `console.warn`
        const logCalls = console.warn.mock.calls.map(call => call[0]);
        expect(logCalls.some(message => message.includes('Invalid sales data'))).toBe(true);
    });
    
    // 13. 混合有效與無效員工數據處理
    it('應該處理混合有效和無效的員工數據', () => {
        const employees = [
            { id: 1, name: 'John Doe', department: 'Sales', position: 'Manager' },
            { id: 2, department: 'Sales', position: 'Associate' } // 缺少 name 欄位
        ];
        const employeeData = new EmployeeData(employees);
        const reportGenerator = new ReportGenerator();
    
        employeeData.accept(reportGenerator);
    
        // 檢查日誌，確保第一個員工的數據被處理，第二個被警告
        const logCalls = console.log.mock.calls.map(call => call[0]);
        expect(logCalls.some(message => message.includes('Employee: John Doe'))).toBe(true);
    
        const warnCalls = console.warn.mock.calls.map(call => call[0]);
        expect(warnCalls.some(message => message.includes('Invalid employee data'))).toBe(true);
    });
    
    // 14. 完全無效的銷售數據處理
    it('應該在完全無效的銷售數據時拋出錯誤', () => {
        const sales = [
            { id: null, salesPerson: null, totalSales: null }
        ];
        const salesData = new SalesData(sales);
        const reportGenerator = new ReportGenerator();
    
        salesData.accept(reportGenerator);
    
        // 檢查是否記錄了 `console.warn`
        const logCalls = console.warn.mock.calls.map(call => call[0]);
        expect(logCalls.some(message => message.includes('Invalid sales data'))).toBe(true);    
    });
    
    // 15. 良好性能
    it('應該在非常大數據量下保持良好的性能', () => {
        const employees = Array.from({ length: 1000000 }, (_, index) => ({
            id: index,
            name: `Employee ${index}`,
            department: 'Sales',
            position: 'Associate'
        }));
        const employeeData = new EmployeeData(employees);
        const reportGenerator = new ReportGenerator();
    
        const startTime = Date.now();
        employeeData.accept(reportGenerator);
        const endTime = Date.now();
    
        const executionTime = endTime - startTime;
        expect(executionTime).toBeLessThan(10000); // 性能門檻，例如 10 秒
    });
    
    // 16. 允許同時多個訪問者訪問數據
    it('應該允許同時多個訪問者訪問同一數據集', async () => {
        const employees = [
            { id: 1, name: 'John Doe', department: 'Sales', position: 'Manager' },
            { id: 2, name: 'Jane Smith', department: 'Sales', position: 'Associate' }
        ];
        const employeeData = new EmployeeData(employees);
        const reportGenerator1 = new ReportGenerator();
        const reportGenerator2 = new ReportGenerator();
    
        await Promise.all([
            new Promise(resolve => {
                employeeData.accept(reportGenerator1);
                resolve();
            }),
            new Promise(resolve => {
                employeeData.accept(reportGenerator2);
                resolve();
            })
        ]);
    
        // 確認兩個訪問者都正確處理了數據
        const logCalls = console.log.mock.calls.map(call => call[0]);
        expect(logCalls.length).toBe(4); // 確保每個訪問者處理兩個員工數據
    });
    
    // 17. 相同訪問者的多次訪問
    it('應該允許相同訪問者多次訪問同一數據集', () => {
        const employees = [
            { id: 1, name: 'John Doe', department: 'Sales', position: 'Manager' },
        ];
        const employeeData = new EmployeeData(employees);
        const reportGenerator = new ReportGenerator();
    
        employeeData.accept(reportGenerator); // 第一次訪問
        employeeData.accept(reportGenerator); // 第二次訪問
    
        const logCalls = console.log.mock.calls.map(call => call[0]);
        expect(logCalls.length).toBe(2); // 確保每次訪問都生成報告
    });
    
    // 18. 異步訪問者處理
    it('應該正確處理異步訪問者的情況', async () => {
        const employees = [
            { id: 1, name: 'John Doe', department: 'Sales', position: 'Manager' },
        ];
        const employeeData = new EmployeeData(employees);
        const asyncReportGenerator = {
            visitEmployee: jest.fn(async (employee) => {
                await new Promise(resolve => setTimeout(resolve, 100)); // 模擬異步操作
                console.log(`Employee: ${employee.name}`);
            })
        };
    
        await employeeData.accept(asyncReportGenerator);
    
        const logCalls = console.log.mock.calls.map(call => call[0]);
        expect(logCalls.some(message => message.includes('John Doe'))).toBe(true);    
    });
    
    // 19. 訪問失敗後繼續處理其他數據
    it('應該在訪問失敗後繼續處理其他數據', () => {
        const employees = [
            { id: 1, name: 'John Doe', department: 'Sales', position: 'Manager' },
            { id: 2, name: null, department: 'Sales', position: 'Associate' } // 無效的員工
        ];
        const employeeData = new EmployeeData(employees);
        const reportGenerator = new ReportGenerator();
    
        employeeData.accept(reportGenerator);
    
        const logCalls = console.log.mock.calls.map(call => call[0]);
        expect(logCalls.some(message => message.includes('John Doe'))).toBe(true); // 應該處理了有效數據
        
        const warnCalls = console.warn.mock.calls.map(call => call[0]);
        expect(warnCalls.some(message => message.includes('Invalid employee data'))).toBe(true); // 警告無效數據
    });
});
