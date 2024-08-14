const OldPaymentSystem = require('./OldPaymentSystem');
const IPaymentProcessor = require('./IPaymentProcessor');

/**
 * 支付適配器類別。
 * 此適配器將舊的支付系統適配到新系統的接口中，以便在新系統中使用舊系統的功能。
 * 
 * TODO: 擴展兼容性
 *  - 探討是否需要增加對未來版本的舊支付系統的兼容性，並考慮引入策略模式來動態選擇不同版本的舊支付系統。
 * 
 * TODO: 增加日誌功能
 *  - 可以考慮在支付過程中加入更詳細的日誌記錄，如支付開始時間、結束時間等，以便後續分析和調試。
 */
class PaymentAdapter extends IPaymentProcessor {
    constructor() {
        super();
        this.oldPaymentSystem = new OldPaymentSystem();
    }

    /**
     * 支付方法，通過調用舊支付系統的方法來實現。
     * @param {number} amount - 支付的金額。
     * 
     * TODO: 增加數據驗證
     *  - 除了金額驗證，考慮加入更多的數據驗證步驟，如檢查用戶賬戶是否存在足夠的餘額。
     */
    pay(amount) {
        if (amount === undefined || amount === null) {
            throw new Error('Amount is required to process payment');
        }

        // 檢查是否為數字並且是否大於等於0
        if (typeof amount !== 'number' || amount < 0) {
            throw new Error('Amount must be a non-negative number');
        }
        
        this.oldPaymentSystem.processPayment(amount);
    }
}

module.exports = PaymentAdapter;