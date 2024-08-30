class Transaction {
    constructor(transactionType, details) {
        if (!transactionType || !details) {
            throw new Error('Invalid transaction type or details');
        }
        this.transactionType = transactionType;
        this.details = details;
    }

    async execute() {
        return await this.transactionType.process(this.details);
    }
}

module.exports = Transaction;
