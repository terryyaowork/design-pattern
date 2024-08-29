const PaymentProcessor = require('./PaymentProcessor');

class BankTransferProcessor extends PaymentProcessor {
    async processPayment(amount) {
        console.log(`Processing bank transfer payment of ${amount}`);
        // 假設這裡有異步操作，例如 API 調用
        await new Promise(resolve => setTimeout(resolve, 100));
    }
}

module.exports = BankTransferProcessor;
