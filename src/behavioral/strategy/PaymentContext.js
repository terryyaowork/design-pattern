class PaymentContext {
    constructor(strategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy) {
        this.strategy = strategy;
    }

    validate() {
        // TODO: 考慮新增錯誤日誌或監控，以便在驗證失敗時能夠進行追蹤。
        return this.strategy.validate();
    }

    executeStrategy(amount) {
        this.validate(); // 支付前進行驗證
        // TODO: 新增錯誤處理機制，以便在支付過程中出現錯誤時能夠適當處理。
        return this.strategy.pay(amount);
    }
}

module.exports = PaymentContext;
