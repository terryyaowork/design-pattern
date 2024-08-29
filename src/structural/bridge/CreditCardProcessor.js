const PaymentProcessor = require('./PaymentProcessor');

class CreditCardProcessor extends PaymentProcessor {
    async processPayment(amount) {
        console.log(`Processing credit card payment of ${amount}`);
        // 假設這裡有異步操作，例如 API 調用
        await new Promise(resolve => setTimeout(resolve, 100));
    }
}

module.exports = CreditCardProcessor;
