/**
 * Builder Pattern 測試文件
 * 
 * 測試的邏輯和覆蓋的情境如下：
 * 
 * 1. **報告標題設置測試：**
 *    - 測試能否正確設置報告的標題，確保 `buildTitle` 方法的正常運行。
 * 
 * 2. **圖表和表格添加測試：**
 *    - 測試能否正確添加圖表和表格，驗證 `buildChart` 和 `buildTable` 方法的正確性。
 * 
 * 3. **ReportDirector 簡單報告構建測試：**
 *    - 測試能否通過 `ReportDirector` 構建簡單報告，驗證 `constructSimpleReport` 的功能。
 * 
 * 4. **ReportDirector 詳細報告構建測試：**
 *    - 測試能否通過 `ReportDirector` 構建詳細報告，驗證 `constructDetailedReport` 的功能。
 * 
 * 5. **無設置任何屬性邊界測試：**
 *    - 測試在無設置任何屬性的情況下能否正確構建報告，驗證默認值處理。
 * 
 * 6. **異步構建過程測試：**
 *    - 測試異步構建過程中的正確性，確保 `build` 方法在處理異步操作時能正確運行。
 * 
 * 7. **重複設置標題測試：**
 *    - 測試多次設置標題時是否能正確覆蓋，驗證標題的唯一性。
 * 
 * 8. **大規模數據處理測試：**
 *    - 測試大規模數據（如 1000 個圖表和表格）能否正確添加，檢驗系統的處理能力。
 * 
 * 9. **混合空字符串和數據測試：**
 *    - 測試在設置空字符串和數據時能否正確處理，檢驗輸入的健壯性。
 * 
 * 10. **異常情況處理測試：**
 *     - 測試異步操作中的錯誤處理，驗證系統在異常情況下的穩定性。
 * 
 * 11. **異步操作順序性測試：**
 *     - 測試多次異步操作的順序性，確保添加的內容按照預期順序執行。
 */
const ReportBuilder = require('../../../src/creational/builder/ReportBuilder');
const ReportDirector = require('../../../src/creational/builder/ReportDirector');

describe('Builder Pattern', () => {

    beforeEach(() => {
        jest.spyOn(console, 'log').mockImplementation(() => {});  // 禁用 console.log
    });

    afterEach(() => {
        jest.restoreAllMocks();  // 恢復 console.log
    });

    it('應該能正確地設置報告標題', async () => {
        const builder = new ReportBuilder();
        const report = await builder.buildTitle('Annual Report').build();
        expect(report.title).toBe('Annual Report');
    });

    it('應該能正確地添加圖表和表格', async () => {
        const builder = new ReportBuilder();
        const report = await builder
            .buildTitle('Sales Report')
            .buildChart('Sales Chart')
            .buildTable('Sales Table')
            .build();
        
        expect(report.charts).toContain('Sales Chart');
        expect(report.tables).toContain('Sales Table');
    });

    it('應該能通過 ReportDirector 構建簡單報告', async () => {
        const builder = new ReportBuilder();
        const director = new ReportDirector(builder);
        const simpleReport = await director.constructSimpleReport();
        
        expect(simpleReport.title).toBe('Simple Report');
        expect(simpleReport.charts).toContain('Simple Chart');
        expect(simpleReport.tables.length).toBe(0);
        expect(simpleReport.comments).toBe('');
    });

    it('應該能通過 ReportDirector 構建詳細報告', async () => {
        const builder = new ReportBuilder();
        const director = new ReportDirector(builder);
        const detailedReport = await director.constructDetailedReport();
        
        expect(detailedReport.title).toBe('Detailed Report');
        expect(detailedReport.charts).toContain('Chart 1');
        expect(detailedReport.tables).toContain('Table 1');
        expect(detailedReport.comments).toBe('This is a detailed report.');
    });

    it('應該能處理邊界情況：無設置任何屬性', async () => {
        const builder = new ReportBuilder();
        const report = await builder.build();
        
        expect(report.title).toBe('');
        expect(report.charts.length).toBe(0);
        expect(report.tables.length).toBe(0);
        expect(report.comments).toBe('');
    });
    
    it('應該能正確處理異步構建過程', async () => {
        const builder = new ReportBuilder();
        const report = await builder
            .buildTitle('Async Report')
            .buildChart(await Promise.resolve('Async Chart'))
            .buildTable(await Promise.resolve('Async Table'))
            .buildComments(await Promise.resolve('Async Comments'))
            .build();
        
        expect(report.title).toBe('Async Report');
        expect(report.charts).toContain('Async Chart');
        expect(report.tables).toContain('Async Table');
        expect(report.comments).toBe('Async Comments');
    });

    it('應該能正確處理重複設置標題', async () => {
        const builder = new ReportBuilder();
        const report = await builder
            .buildTitle('First Title')
            .buildTitle('Second Title')
            .build();
        
        expect(report.title).toBe('Second Title');
    });

    it('應該能處理大規模數據的圖表和表格添加', async () => {
        const builder = new ReportBuilder();
        const charts = Array(1000).fill('Chart');
        const tables = Array(1000).fill('Table');

        let reportBuilder = builder.buildTitle('Big Data Report');
        charts.forEach(chart => {
            reportBuilder = reportBuilder.buildChart(chart);
        });
        tables.forEach(table => {
            reportBuilder = reportBuilder.buildTable(table);
        });

        const report = await reportBuilder.build();
        
        expect(report.charts.length).toBe(1000);
        expect(report.tables.length).toBe(1000);
    });

    it('應該能正確處理混合空字符串和數據的情況', async () => {
        const builder = new ReportBuilder();
        const report = await builder
            .buildTitle('')
            .buildChart('')
            .buildTable('')
            .buildComments('')
            .build();
        
        expect(report.title).toBe('');
        expect(report.charts.length).toBe(1);
        expect(report.tables.length).toBe(1);
        expect(report.comments).toBe('');
    });

    it('應該正確處理異常情況：未設置任何屬性並直接構建', async () => {
        const builder = new ReportBuilder();
        const report = await builder.build();
        
        expect(report.title).toBe('');
        expect(report.charts.length).toBe(0);
        expect(report.tables.length).toBe(0);
        expect(report.comments).toBe('');
    });
    
    it('應該能正確處理異步操作中的錯誤', async () => {
        const builder = new ReportBuilder();
        try {
            await builder
                .buildTitle('Error Report')
                .buildChart(await Promise.reject('Async Error'))
                .build();
        } catch (error) {
            expect(error).toBe('Async Error');
        }
    });

    it('應該能正確處理多次異步操作的順序性', async () => {
        const builder = new ReportBuilder();
        const report = await builder
            .buildTitle('Order Report')
            .buildChart(await Promise.resolve('First Chart'))
            .buildChart(await Promise.resolve('Second Chart'))
            .buildTable(await Promise.resolve('First Table'))
            .buildTable(await Promise.resolve('Second Table'))
            .build();
        
        expect(report.charts).toEqual(['First Chart', 'Second Chart']);
        expect(report.tables).toEqual(['First Table', 'Second Table']);
    });
});
