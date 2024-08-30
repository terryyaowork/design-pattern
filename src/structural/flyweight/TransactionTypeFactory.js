const TransactionType = require('./TransactionType');

class TransactionTypeFactory {
    constructor() {
        this.transactionTypes = {}; // 修正變量名為 transactionTypes
    }

    getTransactionType(type, description) {
        if (!type || !description) {
            throw new Error('Invalid type or description');
        }
        if (!this.transactionTypes[type]) {  // 確保正確引用 transactionTypes
            this.transactionTypes[type] = new TransactionType(type, description);
        }
        return this.transactionTypes[type];
    }
}

module.exports = TransactionTypeFactory;
