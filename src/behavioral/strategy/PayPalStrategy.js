class PayPalStrategy {
    constructor(email) {
        this.email = email;
    }

    validate() {
        if (!this.email || !this.email.includes('@')) {
            throw new Error('Invalid PayPal email');
        }
        // TODO: 考慮使用正則表達式來進一步驗證 email 格式。
        return true;
    }

    pay(amount) {
        // TODO: 將 PayPal 支付的交易記錄下來，以便後續審計。
        return `Paid ${amount} using PayPal for ${this.email}`;
    }
}

module.exports = PayPalStrategy;
