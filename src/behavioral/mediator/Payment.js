class Payment {
    async processPayment(amount) {
        // 模擬支付過程
        if (amount <= 0) {
            return false; // 支付失敗
        }
        return true; // 支付成功
    }
}

module.exports = Payment;
