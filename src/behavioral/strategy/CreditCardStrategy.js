class CreditCardStrategy {
    constructor(cardNumber, cardHolder, expirationDate) {
        this.cardNumber = cardNumber;
        this.cardHolder = cardHolder;
        this.expirationDate = expirationDate;
    }

    validate() {
        if (!this.cardNumber || !this.cardHolder || !this.expirationDate) {
            throw new Error('Invalid credit card details');
        }
        // 假設這裡還有其他信用卡驗證邏輯
        return true;
    }

    pay(amount) {
        return `Paid ${amount} using Credit Card for ${this.cardHolder}`;
    }
}

module.exports = CreditCardStrategy;
