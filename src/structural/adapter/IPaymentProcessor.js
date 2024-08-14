/**
 * 支付處理器接口。
 * 此接口定義了所有支付處理器應該實現的標準方法。
 */
class IPaymentProcessor {
    /**
     * 支付方法，應該在子類中實現。
     * @param {number} amount - 支付的金額。
     */
    pay(amount) {
        throw new Error('pay() method must be implemented');
    }
}

module.exports = IPaymentProcessor;