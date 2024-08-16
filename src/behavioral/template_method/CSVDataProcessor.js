const fs = require('fs');
const DataProcessor = require('./DataProcessor');

class CSVDataProcessor extends DataProcessor {
    loadData() {
        console.log('Loading CSV data...');
        if (!this.filePath.endsWith('.csv')) {
            throw new Error('Invalid file format, expected CSV');
        }
        this.data = fs.readFileSync(this.filePath, 'utf-8');
    }

    validateData() {
        console.log('Validating CSV data...');
        if (!this.data.includes(',')) {
            throw new Error('Invalid CSV data format');
        }
    }

    parseData() {
        console.log('Parsing CSV data...');
        this.parsedData = this.data.split('\n').map(row => row.split(','));

        // 檢查每一行是否有正確的欄位數
        const expectedColumns = this.parsedData[0].length;
        if (this.parsedData.some(row => row.length !== expectedColumns)) {
            throw new Error('Invalid CSV data format');
        }
    }
}

module.exports = CSVDataProcessor;

/**
 * TODO:
 * - 支援其他分隔符號的 CSV 格式（如 ;、| 等）
 * - 增加流式處理以改善大型 CSV 文件的效能
 * - 處理不同的文件編碼格式，避免因編碼不同導致讀取問題
 * - 增加更細緻的 CSV 列數據驗證機制，確保每一列的數據完整性
 */