/**
 * RealImage 類別代表實際需要加載和顯示的圖像。
 * 當創建一個 RealImage 對象時，它會從磁盤加載圖像。
 */
class RealImage {
    /**
     * @param {string} filename - 圖像文件的名稱
     */
    constructor(filename) {
        this.filename = filename;
        this.loadFromDisk(); // 在創建實例時模擬從磁盤加載圖像
    }

    /**
     * 模擬從磁盤加載圖像的過程。
     * 通常這是一個開銷較大的操作，所以會在這裡模擬展示。
     */
    loadFromDisk() {
        console.log(`Loading ${this.filename} from disk...`);
    }

    /**
     * 顯示圖像。
     * 當圖像被要求顯示時，會輸出顯示信息。
     */
    display() {
        console.log(`Displaying ${this.filename}`);
    }
}

module.exports = RealImage;
