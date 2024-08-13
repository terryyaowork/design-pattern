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
        if (this.cardNumber.length !== 16) {
            throw new Error('Credit card number must be 16 digits long');
        }
        // TODO: 可以考慮加入 Luhn 演算法來進一步驗證信用卡號的有效性。
        return true;
    }

    pay(amount) {
        // TODO: 考慮生成交易ID，以便支付流程的追蹤與紀錄。
        return `Paid ${amount} using Credit Card for ${this.cardHolder}`;
    }
}

module.exports = CreditCardStrategy;
