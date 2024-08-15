/**
 * 配送系統。
 * 負責商品的配送和取消配送操作。
 *
 * TODO:
 * - 增加配送狀態追蹤機制，記錄每筆配送的進度（如正在運送、已到達等）
 * - 將配送操作轉換為異步函數，模擬真實的物流延遲
 * - 增加配送失敗處理機制，處理地址無效或物流問題
 * - 集成第三方物流服務 API，以實現自動化配送和狀態更新
 */
class ShippingService {
    /**
     * 執行配送操作。
     * 
     * @param {string} item - 商品名稱。
     * @param {number} quantity - 配送數量。
     * @param {string} address - 配送地址。
     * @returns {Promise<boolean>} - 返回配送是否成功。
     */
    async shipItem(item, quantity, address) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log(`Shipping ${quantity} of ${item} to ${address}.`);
                resolve(true); // 模擬配送成功
            }, 1000); // 模擬配送延遲
        });
    }

    /**
     * 取消配送操作。
     * 用於訂單失敗或取消時停止配送。
     * 
     * @param {string} item - 商品名稱。
     * @param {number} quantity - 取消配送的數量。
     * @returns {Promise<void>}
     */
    async cancelShipment(item, quantity) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log(`Shipment of ${quantity} of ${item} has been canceled.`);
                resolve();
            }, 500); // 模擬取消延遲
        });
    }
}

module.exports = ShippingService;