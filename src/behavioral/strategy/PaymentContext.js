class PaymentContext {
    constructor(strategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy) {
        this.strategy = strategy;
    }

    validate() {
        return this.strategy.validate();
    }

    executeStrategy(amount) {
        this.validate(); // 支付前進行驗證
        return this.strategy.pay(amount);
    }
}

module.exports = PaymentContext;
