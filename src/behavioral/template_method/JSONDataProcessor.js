const fs = require('fs');
const DataProcessor = require('./DataProcessor');

class JSONDataProcessor extends DataProcessor {
    loadData() {
        console.log('Loading JSON data...');
        if (!this.filePath.endsWith('.json')) {
            throw new Error('Invalid file format, expected JSON');
        }
        this.data = fs.readFileSync(this.filePath, 'utf-8');
    }

    validateData() {
        console.log('Validating JSON data...');
        try {
            JSON.parse(this.data);
        } catch (e) {
            throw new Error('Invalid JSON data format');
        }
    }

    parseData() {
        console.log('Parsing JSON data...');
        this.parsedData = JSON.parse(this.data);

        // 檢查是否有期望的數據結構 (比如確認某個字段是否存在)
        if (!this.parsedData.users || !Array.isArray(this.parsedData.users)) {
            throw new Error('Invalid JSON data format');
        }
    }
}

module.exports = JSONDataProcessor;

/**
 * TODO:
 * - 支援 JSON 結構的擴展與合併功能，處理更複雜的嵌套結構
 * - 支援包含注釋（comments）的 JSON 文件解析
 * - 增加 JSON Schema 驗證機制，確保 JSON 符合特定的結構
 * - 增加流式處理以改善超大 JSON 文件的效能
 */