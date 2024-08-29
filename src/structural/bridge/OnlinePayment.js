const Payment = require('./Payment');

class OnlinePayment extends Payment {
    async process(amount) {
        await this.paymentProcessor.processPayment(amount);
        console.log("Online payment processed successfully.");
    }
}

module.exports = OnlinePayment;
