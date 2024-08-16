const fs = require('fs');

class DataProcessor {
    constructor(filePath) {
        if (!filePath) {
            throw new Error('A file path must be provided');
        }
        this.filePath = filePath;
    }

    process() {
        if (!this.checkFileExists()) {
            throw new Error(`File ${this.filePath} does not exist`);
        }
        const fd = fs.openSync(this.filePath, 'r'); // 打開文件描述符
        try {
            this.loadData();        // 加載數據
            this.validateData();    // 驗證數據
            this.parseData();       // 解析數據
            this.analyzeData();     // 分析數據
            this.cleanup();         // 清理工作

            return this.parsedData; // 確保返回結果
        } finally {
            fs.closeSync(fd);  // 關閉文件描述符
        }
    }

    checkFileExists() {
        return fs.existsSync(this.filePath);
    }

    loadData() {
        throw new Error('loadData() must be implemented');
    }

    validateData() {
        throw new Error('validateData() must be implemented');
    }

    parseData() {
        throw new Error('parseData() must be implemented');
    }

    analyzeData() {
        console.log('Analyzing data...');
    }

    cleanup() {
        console.log('Cleanup completed.');
    }

    listFiles(directory) {
        if (!fs.existsSync(directory)) {
            throw new Error(`Directory ${directory} does not exist`);
        }
        return fs.readdirSync(directory);
    }

    deleteFile() {
        if (fs.existsSync(this.filePath)) {
            fs.unlinkSync(this.filePath);
            console.log(`File ${this.filePath} deleted`);
        } else {
            console.log(`File ${this.filePath} does not exist`);
        }
    }
}

module.exports = DataProcessor;

/**
 * TODO:
 * - 將異常處理邏輯抽離並統一處理，提高代碼的可讀性
 * - 檢查文件的讀取權限和刪除權限，並對權限不足的情況進行處理
 * - 支援更多文件格式，如 XML 和 Excel 文件
 */