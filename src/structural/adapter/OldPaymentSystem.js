/**
 * 舊的支付系統類別。
 * 此類別模擬了一個已經存在但不符合新接口要求的支付系統。
 */
class OldPaymentSystem {
    /**
     * 處理支付的方法。
     * @param {number} amount - 支付的金額。
     */
    processPayment(amount) {
        if (amount === undefined || amount === null) {
            throw new Error('Amount is required to process payment');
        }
        console.log(`Processing payment of $${amount} using the old payment system.`);
    }
}

module.exports = OldPaymentSystem;