class TransactionType {
    constructor(type, description) {
        this.type = type;
        this.description = description;
    }

    async process(transactionDetails) {
        // 模擬處理交易細節
        console.log(`Processing ${this.type} transaction: ${transactionDetails}`);
        return Promise.resolve(`Processed ${this.type} transaction`);
    }
}

module.exports = TransactionType;
