class PayPalStrategy {
    constructor(email) {
        this.email = email;
    }

    validate() {
        if (!this.email) {
            throw new Error('Invalid PayPal email');
        }
        // 假設這裡還有其他 PayPal 驗證邏輯
        return true;
    }

    pay(amount) {
        return `Paid ${amount} using PayPal for ${this.email}`;
    }
}

module.exports = PayPalStrategy;
