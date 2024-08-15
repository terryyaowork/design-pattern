/**
 * 支付處理系統。
 * 負責處理支付和退款操作。
 * 
 * TODO:
 * - 支持多種支付方式的擴展（如信用卡、銀行轉帳、PayPal）
 * - 增加支付狀態管理，將支付進度持久化到數據庫
 * - 增加異步支付的重試機制，處理網絡故障等異常情況
 * - 集成第三方支付平台（如 Stripe、PayPal）的 API
 */
class PaymentProcessor {
    constructor() {
        this.paymentStatus = new Map(); // 記錄每筆訂單的支付狀態
    }

    /**
     * 處理支付操作，帶有重試機制。
     * 檢查支付金額是否有效，並執行支付。
     * 
     * @param {string} orderId - 訂單ID。
     * @param {number} amount - 支付金額。
     * @returns {Promise<boolean>} - 返回支付是否成功。
     */
    async processPayment(orderId, amount) {
        this.paymentStatus.set(orderId, 'pending'); // 設置支付狀態為待處理

        for (let attempt = 0; attempt < 3; attempt++) {
            const result = await this.simulatePayment(amount);
            if (result) {
                this.paymentStatus.set(orderId, 'success');
                console.log(`Payment for order ${orderId} succeeded.`);
                return true;
            } else {
                console.log(`Payment attempt ${attempt + 1} for order ${orderId} failed.`);
            }
        }

        this.paymentStatus.set(orderId, 'failed'); // 支付失敗
        return false;
    }

    /**
     * 模擬支付操作，使用Promise模擬異步支付。
     * 
     * @param {number} amount - 支付金額。
     * @returns {Promise<boolean>} - 返回支付是否成功。
     */
    async simulatePayment(amount) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(amount > 0);
            }, 1000);
        });
    }

    /**
     * 處理退款操作。
     * 在訂單失敗或取消時使用。
     * 
     * @param {number} amount - 退款金額。
     */
    async refundPayment(amount) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log(`Refund of $${amount} processed successfully.`);
                resolve(true);
            }, 500);
        });
    }
}

module.exports = PaymentProcessor;