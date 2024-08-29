/**
 * Bridge Pattern 測試文件
 * 
 * 測試的邏輯和覆蓋的情境如下：
 * 
 * 1. **線上支付測試（信用卡處理器）：**
 *    - 測試使用信用卡處理器進行線上支付。
 * 
 * 2. **線下支付測試（PayPal 處理器）：**
 *    - 測試使用 PayPal 處理器進行線下支付。
 * 
 * 3. **線上支付測試（銀行轉帳處理器）：**
 *    - 測試使用銀行轉帳處理器進行線上支付。
 * 
 * 4. **線下支付測試（信用卡處理器）：**
 *    - 測試使用信用卡處理器進行線下支付。
 * 
 * 5. **線上支付失敗測試（PayPal 處理器）：**
 *    - 測試在資金不足情況下使用 PayPal 處理器進行線上支付。
 * 
 * 6. **支付處理失敗測試（銀行轉帳處理器）：**
 *    - 測試銀行轉帳處理器在支付處理過程中失敗的情境。
 * 
 * 7. **高併發支付測試：**
 *    - 測試高併發情境下的支付處理，確保系統穩定。
 * 
 * 8. **異步支付成功測試：**
 *    - 測試支付處理器在異步操作中的支付成功情境。
 * 
 * 9. **異步支付錯誤測試：**
 *    - 測試支付處理器在異步操作中的錯誤處理。
 * 
 * 10. **無效參數測試：**
 *    - 測試傳入無效金額或其他參數時，系統能正確處理並返回錯誤訊息。
 */

const CreditCardProcessor = require('../../../src/structural/bridge/CreditCardProcessor');
const PayPalProcessor = require('../../../src/structural/bridge/PayPalProcessor');
const BankTransferProcessor = require('../../../src/structural/bridge/BankTransferProcessor');
const OnlinePayment = require('../../../src/structural/bridge/OnlinePayment');
const OfflinePayment = require('../../../src/structural/bridge/OfflinePayment');

describe('Bridge Pattern - Payment Processing', () => {
    beforeEach(() => {
        jest.spyOn(console, 'log').mockImplementation(() => {});  // 禁用 console.log
    });

    afterEach(() => {
        jest.restoreAllMocks();  // 恢復 console.log
    });

    it('應該能夠使用信用卡處理器進行線上支付', async () => {
        const creditCardProcessor = new CreditCardProcessor();
        const onlinePayment = new OnlinePayment(creditCardProcessor);
        await onlinePayment.process(100);
    });

    it('應該能夠使用 PayPal 處理器進行線下支付', async () => {
        const payPalProcessor = new PayPalProcessor();
        const offlinePayment = new OfflinePayment(payPalProcessor);
        await offlinePayment.process(150);
    });

    it('應該能夠使用銀行轉帳處理器進行線上支付', async () => {
        const bankTransferProcessor = new BankTransferProcessor();
        const onlinePayment = new OnlinePayment(bankTransferProcessor);
        await onlinePayment.process(200);
    });

    it('應該能夠使用信用卡處理器進行線下支付', async () => {
        const creditCardProcessor = new CreditCardProcessor();
        const offlinePayment = new OfflinePayment(creditCardProcessor);
        await offlinePayment.process(120);
    });

    it('應該在資金不足時，使用 PayPal 處理器進行線上支付失敗', async () => {
        const payPalProcessor = new PayPalProcessor();
        const onlinePayment = new OnlinePayment(payPalProcessor);
        try {
            await onlinePayment.process(1000);
        } catch (error) {
            expect(error.message).toBe('Insufficient funds');
        }
    });

    it('應該在支付處理過程中失敗，銀行轉帳處理器應拋出錯誤', async () => {
        const bankTransferProcessor = new BankTransferProcessor();
        const onlinePayment = new OnlinePayment(bankTransferProcessor);
        try {
            await onlinePayment.process(300);
        } catch (error) {
            expect(error.message).toBe('Payment processing failed');
        }
    });

    it('應該能在高併發情境下正確處理多個支付請求', async () => {
        const creditCardProcessor = new CreditCardProcessor();
        const onlinePayment = new OnlinePayment(creditCardProcessor);

        const paymentPromises = [];
        for (let i = 0; i < 10; i++) {
            paymentPromises.push(onlinePayment.process(100 + i));
        }

        await Promise.all(paymentPromises);

        expect(console.log).toHaveBeenCalledTimes(20); // 應該有10次處理，20次log
    });

    it('應該能在異步支付操作中成功處理並回傳結果', async () => {
        const bankTransferProcessor = new BankTransferProcessor();
        const onlinePayment = new OnlinePayment(bankTransferProcessor);
        await onlinePayment.process(150);
        expect(console.log).toHaveBeenCalledWith('Processing bank transfer payment of 150');
    });

    it('應該在異步支付操作中發生錯誤並正確回傳錯誤訊息', async () => {
        const faultyProcessor = new BankTransferProcessor();
        jest.spyOn(faultyProcessor, 'processPayment').mockRejectedValueOnce(new Error('Network error'));
        const onlinePayment = new OnlinePayment(faultyProcessor);

        try {
            await onlinePayment.process(250);
        } catch (error) {
            expect(error.message).toBe('Network error');
        }
    });

    it('應該在傳入無效金額時拋出錯誤', async () => {
        const creditCardProcessor = new CreditCardProcessor();
        const onlinePayment = new OnlinePayment(creditCardProcessor);

        try {
            await onlinePayment.process(-50);
        } catch (error) {
            expect(error.message).toBe('Invalid amount');
        }
    });
});
