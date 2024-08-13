/**
 * Factory Pattern 測試總結
 * 
 * 這些測試的目的是確保工廠模式能夠正確地創建不同類型的支付對象，
 * 並且在傳入無效參數或未知支付方式時能夠適當地處理錯誤。
 * 
 * 測試情境包括：
 * 
 * 1. **正確創建與參數驗證**：
 *    - 測試工廠是否能夠正確地創建 `CreditCardPayment`、`BankTransferPayment` 和 `PayPalPayment`。
 *    - 驗證這些對象是否能夠正確處理並執行其方法。
 * 
 * 2. **缺少參數時的錯誤處理**：
 *    - 測試在創建支付對象時，如果缺少必要的參數，是否能夠正確地拋出錯誤。
 *    - 這包括檢查每個支付方式的關鍵參數是否存在。
 * 
 * 3. **未知支付方式的錯誤處理**：
 *    - 測試工廠在收到未知或無效的支付方式時，是否能夠正確地處理並拋出錯誤。
 *    - 這可以防止系統在接收到未定義的支付方式時崩潰或產生未預期的行為。
 * 
 * 這些測試情境旨在全面驗證工廠模式在處理不同支付方式時的正確性和穩定性，確保在面對實際業務需求時，系統能夠有效運行。
 */

const ProductFactory = require('../../../src/creational/factory/index');

describe('Factory Pattern', () => {
    /**
     * 測試 CreditCardPayment 的正確創建和參數驗證。
     * 確保 CreditCardPayment 能夠正確處理有效的信用卡信息。
     */
    it('應該正確創建 CreditCardPayment 並驗證參數', () => {
        const creditCardPayment = ProductFactory.createPayment('CreditCard', {
            cardNumber: '1234567890123456',
            cardHolder: 'John Doe',
            expirationDate: '12/25'
        });
        expect(creditCardPayment.process(100)).toBe('Processing credit card payment of 100 for card holder John Doe');
        expect(creditCardPayment.validateCard()).toBe(true);
    });

    /**
     * 測試當 CreditCardPayment 缺少必要參數時的錯誤處理。
     * 確保在缺少參數時拋出相應錯誤。
     */
    it('應該拋出錯誤當 CreditCardPayment 缺少參數時', () => {
        expect(() => ProductFactory.createPayment('CreditCard', {
            cardHolder: 'John Doe',
            expirationDate: '12/25'
        })).toThrow('Invalid parameters for CreditCardPayment');
    });

    /**
     * 測試 BankTransferPayment 的正確創建和參數驗證。
     * 確保 BankTransferPayment 能夠正確處理有效的銀行轉賬信息。
     */
    it('應該正確創建 BankTransferPayment 並驗證參數', () => {
        const bankTransferPayment = ProductFactory.createPayment('BankTransfer', {
            accountNumber: '9876543210',
            bankCode: '123456789'
        });
        expect(bankTransferPayment.process(200)).toBe('Processing bank transfer of 200 from account 9876543210');
        expect(bankTransferPayment.validateBankDetails()).toBe(true);
    });

    /**
     * 測試當 BankTransferPayment 缺少必要參數時的錯誤處理。
     * 確保在缺少參數時拋出相應錯誤。
     */
    it('應該拋出錯誤當 BankTransferPayment 缺少參數時', () => {
        expect(() => ProductFactory.createPayment('BankTransfer', {
            accountNumber: '9876543210'
        })).toThrow('Invalid parameters for BankTransferPayment');
    });

    /**
     * 測試 PayPalPayment 的正確創建和參數驗證。
     * 確保 PayPalPayment 能夠正確處理有效的 PayPal 信息。
     */
    it('應該正確創建 PayPalPayment 並驗證參數', () => {
        const payPalPayment = ProductFactory.createPayment('PayPal', {
            email: 'john.doe@example.com'
        });
        expect(payPalPayment.process(300)).toBe('Processing PayPal payment of 300 for john.doe@example.com');
    });

    /**
     * 測試當 PayPalPayment 缺少必要參數時的錯誤處理。
     * 確保在缺少參數時拋出相應錯誤。
     */
    it('應該拋出錯誤當 PayPalPayment 缺少參數時', () => {
        expect(() => ProductFactory.createPayment('PayPal', {})).toThrow('Invalid parameters for PayPalPayment');
    });

    /**
     * 測試傳入未知支付方式時的錯誤處理。
     * 確保在傳入無效的支付方式時拋出相應錯誤。
     */
    it('應該在傳入未知支付方式時拋出錯誤', () => {
        expect(() => ProductFactory.createPayment('Bitcoin', {})).toThrow('Unknown payment method');
    });
});
