class BankTransferStrategy {
    constructor(accountNumber, bankCode) {
        this.accountNumber = accountNumber;
        this.bankCode = bankCode;
    }

    validate() {
        if (!this.accountNumber || !this.bankCode) {
            throw new Error('Invalid bank transfer details');
        }
        // TODO: 可以考慮根據已知的銀行代碼清單來驗證銀行代碼的有效性。
        return true;
    }

    pay(amount) {
        // TODO: 考慮為銀行轉帳新增記錄，確保每筆交易的可追溯性。
        return `Paid ${amount} using Bank Transfer from account ${this.accountNumber}`;
    }
}

module.exports = BankTransferStrategy;
