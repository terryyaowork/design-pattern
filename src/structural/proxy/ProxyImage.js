const RealImage = require('./RealImage');

/**
 * ProxyImage 類別作為 RealImage 的代理，它控制對 RealImage 的訪問。
 * 通過代理，可以延遲圖像的加載，直到真正需要顯示圖像時才加載它。
 */
class ProxyImage {
    /**
     * @param {string} filename - 圖像文件的名稱
     */
    constructor(filename) {
        this.filename = filename;
        this.realImage = null; // 初始時代理不會加載圖像
    }

    /**
     * 顯示圖像。
     * 當第一次顯示圖像時，代理會延遲加載圖像；
     * 後續顯示將直接使用已加載的圖像。
     */
    display() {
        try {
            if (this.realImage === null) {
                this.realImage = new RealImage(this.filename); // 這裡可能會拋出異常
            }
            this.realImage.display(); // 顯示圖像
        } catch (error) {
            console.log(`Error displaying image: ${error.message}`);
            throw error; // 向上拋出異常，讓調用方處理
        }
    }
}

module.exports = ProxyImage;
