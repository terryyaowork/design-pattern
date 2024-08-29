class PaymentProcessor {
    processPayment(amount) {
        throw new Error("This method should be overridden");
    }
}

module.exports = PaymentProcessor;
