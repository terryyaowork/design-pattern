class BankTransferStrategy {
    constructor(accountNumber, bankCode) {
        this.accountNumber = accountNumber;
        this.bankCode = bankCode;
    }

    validate() {
        if (!this.accountNumber || !this.bankCode) {
            throw new Error('Invalid bank transfer details');
        }
        // 假設這裡還有其他銀行轉賬驗證邏輯
        return true;
    }

    pay(amount) {
        return `Paid ${amount} using Bank Transfer from account ${this.accountNumber}`;
    }
}

module.exports = BankTransferStrategy;
