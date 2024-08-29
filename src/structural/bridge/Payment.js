class Payment {
    constructor(paymentProcessor) {
        this.paymentProcessor = paymentProcessor;
    }

    process(amount) {
        throw new Error("This method should be overridden");
    }
}

module.exports = Payment;
