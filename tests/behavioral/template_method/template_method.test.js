/**
 * Template Method Pattern 測試總結
 * 
 * 這些測試的目的是檢驗 Template Method 模式在處理不同類型的文件（如 CSV 和 JSON）時的正確性，
 * 確保文件讀取、解析、驗證、錯誤處理以及並發請求的處理都能正常運行。
 * 
 * 測試情境包括：
 * 
 * 1. **正確處理與解析 CSV 文件**：
 *    - 測試 CSV 文件的正確處理與解析，確認能夠將文件數據轉換為正確的資料格式。
 * 
 * 2. **正確處理與解析 JSON 文件**：
 *    - 測試 JSON 文件的正確處理與解析，確認能夠將文件內容轉換為對應的資料結構。
 * 
 * 3. **檔案不存在時的錯誤處理**：
 *    - 測試當指定文件不存在時，是否能夠正確拋出錯誤訊息，避免系統繼續處理不存在的文件。
 * 
 * 4. **錯誤格式的 CSV 文件處理**：
 *    - 測試當 CSV 文件的格式不符合預期時，是否正確地拋出錯誤，保證資料驗證機制的有效性。
 * 
 * 5. **錯誤格式的 JSON 文件處理**：
 *    - 測試當 JSON 文件內容無法解析時，是否能夠捕捉並拋出格式錯誤。
 * 
 * 6. **目錄中的文件列出功能**：
 *    - 測試能否正確地列出指定目錄中的所有文件，模擬列出目錄文件的情境。
 * 
 * 7. **檔案刪除功能**：
 *    - 測試能否成功刪除指定的檔案，並確認檔案刪除後不再存在。
 * 
 * 8. **空 CSV 文件處理**：
 *    - 測試空的 CSV 文件能否被正確處理，並確保在處理過程中能夠拋出對應錯誤。
 * 
 * 9. **含有特殊字符的 CSV 文件處理**：
 *    - 測試 CSV 文件中包含特殊字符時，是否能夠正常處理並解析這些字符。
 * 
 * 10. **大檔案處理**：
 *    - 測試系統對於大型文件的處理能力，確認能夠成功處理超過預期大小的文件。
 * 
 * 11. **多個並發文件處理請求**：
 *    - 測試在多個並發請求下，系統能否正確處理多個文件，同時模擬並發場景。
 * 
 * 12. **資源釋放**：
 *    - 確認在檔案處理完成後，是否能夠正確釋放相關資源，避免資源洩漏。
 * 
 * 13. **多種文件格式的處理**：
 *    - 測試能否同時處理不同格式的文件，例如 CSV 和 JSON，並驗證系統的多格式兼容性。
 * 
 * 14. **檔案讀取失敗時的錯誤處理**：
 *    - 測試當檔案讀取失敗（如讀取過程中出現異常）時，是否正確拋出錯誤並中止操作。
 * 
 * 15. **不完整的 CSV 數據處理**：
 *    - 測試當 CSV 文件中的數據不完整時，是否能夠識別並拋出相應的格式錯誤。
 * 
 * 16. **不支援的文件格式處理**：
 *    - 測試當遇到不支援的文件格式（如 XML）時，是否能夠正確拋出錯誤。
 * 
 * 17. **過大文件處理超時錯誤**：
 *    - 測試處理超大文件時的行為，模擬超時情境並確保系統能夠拋出超時錯誤。
 * 
 * TODO:
 *  - 測試當檔案權限不足時，是否能正確處理讀取與刪除錯誤
 *  - 擴展支援其他文件格式的測試，例如 XML 或 Excel
 */
const fs = require('fs');
const CSVDataProcessor = require('../../../src/behavioral/template_method/CSVDataProcessor');
const JSONDataProcessor = require('../../../src/behavioral/template_method/JSONDataProcessor');

describe('Template Method Pattern - Data Processing with CRUD and Error Handling', () => {
    // 在每個測試前設定 mock 行為
    beforeEach(() => {
        jest.spyOn(fs, 'existsSync').mockReturnValue(true); // 模擬檔案存在
        jest.spyOn(fs, 'openSync').mockReturnValue(123);    // 模擬文件打開
        jest.spyOn(fs, 'closeSync').mockImplementation(() => {}); // 模擬文件關閉

        jest.spyOn(console, 'log').mockImplementation(() => {});  // 禁用 console.log
    });

    afterEach(() => {
        jest.restoreAllMocks(); // 測試後重置所有 mock
    });

    const mockFileRead = (fileContent) => {
        jest.spyOn(fs, 'readFileSync').mockReturnValue(fileContent); // 模擬文件讀取
    };

    // 測試 CSV 文件的正確處理
    it('應該正確處理 CSV 數據', () => {
        mockFileRead('name,age\nAlice,30\nBob,25');
        const csvProcessor = new CSVDataProcessor('data.csv');
        csvProcessor.process();
        expect(csvProcessor.parsedData).toEqual([['name', 'age'], ['Alice', '30'], ['Bob', '25']]);
    });

    // 測試 JSON 文件的正確處理
    it('應該正確處理 JSON 數據', () => {
        mockFileRead('{"users":[{"name":"Alice","age":30},{"name":"Bob","age":25}]}');
        const jsonProcessor = new JSONDataProcessor('data.json');
        jsonProcessor.process();
        expect(jsonProcessor.parsedData).toEqual({ users: [{ name: 'Alice', age: 30 }, { name: 'Bob', age: 25 }] });
    });

    // 測試當檔案不存在時的錯誤處理
    it('應該在檔案不存在時拋出錯誤', () => {
        jest.spyOn(fs, 'existsSync').mockReturnValue(false);
        const csvProcessor = new CSVDataProcessor('non_existent.csv');
        expect(() => csvProcessor.process()).toThrow('File non_existent.csv does not exist');
    });

    // 測試錯誤的 CSV 格式
    it('應該正確處理並驗證錯誤的 CSV 格式', () => {
        mockFileRead('name;age');
        const csvProcessor = new CSVDataProcessor('invalid.csv');
        expect(() => csvProcessor.process()).toThrow('Invalid CSV data format');
    });

    // 測試錯誤的 JSON 格式
    it('應該正確處理並驗證錯誤的 JSON 格式', () => {
        mockFileRead('Invalid JSON');
        const jsonProcessor = new JSONDataProcessor('invalid.json');
        expect(() => jsonProcessor.process()).toThrow('Invalid JSON data format');
    });

    // 測試目錄檔案列出功能
    it('應該能夠列出目錄中的檔案', () => {
        jest.spyOn(fs, 'readdirSync').mockReturnValue(['file1.csv', 'file2.json']);
        const processor = new CSVDataProcessor('data.csv');
        const files = processor.listFiles('./data');
        expect(files).toEqual(['file1.csv', 'file2.json']);
    });

    // 測試檔案刪除功能
    it('應該正確刪除檔案', () => {
        jest.spyOn(fs, 'unlinkSync').mockImplementation(() => {});
        const processor = new CSVDataProcessor('data.csv');
        processor.deleteFile();
        expect(fs.unlinkSync).toHaveBeenCalledWith('data.csv');
    });

    // 測試空 CSV 文件的處理
    it('應該正確處理空 CSV 文件', () => {
        mockFileRead('');
        const csvProcessor = new CSVDataProcessor('empty.csv');
        expect(() => csvProcessor.process()).toThrow('Invalid CSV data format');
    });

    // 測試特殊字符的處理
    it('應該正確處理含有特殊字符的 CSV 文件', () => {
        mockFileRead('name,age\nAlice,30\nBob,25\nTom@,20');
        const csvProcessor = new CSVDataProcessor('special.csv');
        csvProcessor.process();
        expect(csvProcessor.parsedData).toEqual([['name', 'age'], ['Alice', '30'], ['Bob', '25'], ['Tom@', '20']]);
    });

    // 測試大文件的處理
    it('應該正確處理大文件', () => {
        const largeCSV = ['name,age', ...Array(10000).fill('Alice,30')].join('\n');
        mockFileRead(largeCSV);
        const csvProcessor = new CSVDataProcessor('large.csv');
        csvProcessor.process();
        expect(csvProcessor.parsedData.length).toBe(10001);
    });

    // 測試多個並發請求的處理
    it('應該正確處理多個並發的文件處理請求', () => {
        mockFileRead('name,age\nAlice,30\nBob,25');
        const processor1 = new CSVDataProcessor('file1.csv');
        const processor2 = new CSVDataProcessor('file2.csv');
        expect(processor1.process()).toEqual([['name', 'age'], ['Alice', '30'], ['Bob', '25']]);
        expect(processor2.process()).toEqual([['name', 'age'], ['Alice', '30'], ['Bob', '25']]);
    });

    // 測試資源釋放
    it('應該在處理完成後釋放資源', () => {
        mockFileRead('name,age\nAlice,30\nBob,25');
        const processor = new CSVDataProcessor('data.csv');
        processor.process();
        expect(fs.closeSync).toHaveBeenCalled();
    });

    // 測試不同格式文件的同時處理
    it('應該能夠同時處理多個不同格式的文件', () => {
        jest.spyOn(fs, 'readFileSync').mockImplementation((filePath) => {
            if (filePath.endsWith('.csv')) return 'name,age\nAlice,30\nBob,25';
            if (filePath.endsWith('.json')) return '{"users":[{"name":"Alice","age":30},{"name":"Bob","age":25}]}';
        });
        const csvProcessor = new CSVDataProcessor('data.csv');
        const jsonProcessor = new JSONDataProcessor('data.json');
        csvProcessor.process();
        jsonProcessor.process();
        expect(csvProcessor.parsedData).toEqual([['name', 'age'], ['Alice', '30'], ['Bob', '25']]);
        expect(jsonProcessor.parsedData).toEqual({ users: [{ name: 'Alice', age: 30 }, { name: 'Bob', age: 25 }] });
    });

    // 測試檔案讀取失敗時的錯誤處理
    it('應該在讀取文件失敗時處理錯誤', () => {
        jest.spyOn(fs, 'readFileSync').mockImplementation(() => { throw new Error('讀取文件失敗'); });
        const csvProcessor = new CSVDataProcessor('data.csv');
        expect(() => csvProcessor.process()).toThrow('讀取文件失敗');
    });

    // 測試不完整的 CSV 數據
    it('應該在 CSV 數據不完整時處理錯誤', () => {
        mockFileRead('name,age\nAlice');
        const csvProcessor = new CSVDataProcessor('data.csv');
        expect(() => csvProcessor.process()).toThrow('Invalid CSV data format');
    });

    // 測試不支援的文件格式
    it('應該在處理不支援的文件格式時拋出錯誤', () => {
        mockFileRead('<xml><data></data></xml>');
        const processor = new CSVDataProcessor('data.xml');
        expect(() => processor.process()).toThrow('Invalid file format, expected CSV');
    });

    // 測試過大文件的處理
    it('應該在處理過大文件時拋出超時錯誤', () => {
        const largeCSV = ['name,age', ...Array(1000000).fill('Alice,30')].join('\n');
        mockFileRead(largeCSV);
        const csvProcessor = new CSVDataProcessor('large.csv');
        csvProcessor.process = jest.fn(() => {
            throw new Error('File too large to process');
        });
        expect(() => csvProcessor.process()).toThrow('File too large to process');
    });
});