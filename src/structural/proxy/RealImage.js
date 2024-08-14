class RealImage {
    /**
     * @param {string} filename - 圖像文件的名稱
     */
    constructor(filename) {
        this.filename = filename;
        try {
            this.loadFromDisk(); // 在創建實例時模擬從磁盤加載圖像
        } catch (error) {
            console.log(`Error loading image: ${error.message}`);
            throw error; // 重新拋出異常以便外部捕獲
        }
    }

    /**
     * 模擬從磁盤加載圖像的過程。
     * 通常這是一個開銷較大的操作，所以會在這裡模擬展示。
     */
    loadFromDisk() {
        if (!this.filename) {
            throw new Error('Filename is missing');
        }
        console.log(`Loading ${this.filename} from disk...`);
    }

    /**
     * 顯示圖像。
     * 當圖像被要求顯示時，會輸出顯示信息。
     */
    display() {
        try {
            console.log(`Displaying ${this.filename}`);
        } catch (error) {
            console.log(`Error displaying image: ${error.message}`);
            throw error; // 重新拋出異常以便外部捕獲
        }
    }
}

module.exports = RealImage;
