const Payment = require('./Payment');

class OfflinePayment extends Payment {
    async process(amount) {
        await this.paymentProcessor.processPayment(amount);
        console.log("Offline payment processed successfully.");
    }
}

module.exports = OfflinePayment;
