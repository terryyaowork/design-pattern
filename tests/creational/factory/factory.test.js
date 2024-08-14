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
 * 4. **可擴展性測試**：
 *    - 測試工廠是否能夠輕鬆地擴展以支持新的支付方式。
 * 
 * 5. **異常情況測試**：
 *    - 測試當傳入 `null` 或 `undefined` 作為支付選項時，工廠是否能正確處理。
 * 
 * 6. **對象類型測試**：
 *    - 測試工廠創建的對象是否具有正確的類型。
 * 
 * 這些測試情境旨在全面驗證工廠模式在處理不同支付方式時的正確性和穩定性，確保在面對實際業務需求時，系統能夠有效運行。
 */

const {
    PaymentFactory,
    CreditCardPayment,
    BankTransferPayment,
    PayPalPayment,
    Payment
} = require('../../../src/creational/factory/ProductFactory');

describe('Factory Pattern', () => {
    let factory;

    beforeEach(() => {
        factory = new PaymentFactory();
    });

    // 測試 CreditCardPayment 的正確創建和參數驗證
    it('應該正確創建 CreditCardPayment 並驗證參數', () => {
        const creditCardPayment = factory.createPayment('CreditCard', {
            cardNumber: '1234567890123456',
            cardHolder: 'John Doe',
            expirationDate: '12/25'
        });
        expect(creditCardPayment.process(100)).toBe('Processing credit card payment of 100 for card holder John Doe');
        expect(creditCardPayment.validateCard()).toBe(true);
    });

    // 測試當 CreditCardPayment 缺少必要參數時的錯誤處理
    it('應該拋出錯誤當 CreditCardPayment 缺少參數時', () => {
        expect(() => factory.createPayment('CreditCard', {
            cardHolder: 'John Doe',
            expirationDate: '12/25'
        })).toThrow('Invalid parameters for CreditCardPayment');
    });

    // 測試 BankTransferPayment 的正確創建和參數驗證
    it('應該正確創建 BankTransferPayment 並驗證參數', () => {
        const bankTransferPayment = factory.createPayment('BankTransfer', {
            accountNumber: '9876543210',
            bankCode: '123456789'
        });
        expect(bankTransferPayment.process(200)).toBe('Processing bank transfer of 200 from account 9876543210');
        expect(bankTransferPayment.validateBankDetails()).toBe(true);
    });

    // 測試當 BankTransferPayment 缺少必要參數時的錯誤處理
    it('應該拋出錯誤當 BankTransferPayment 缺少參數時', () => {
        expect(() => factory.createPayment('BankTransfer', {
            accountNumber: '9876543210'
        })).toThrow('Invalid parameters for BankTransferPayment');
    });

    // 測試 PayPalPayment 的正確創建和參數驗證
    it('應該正確創建 PayPalPayment 並驗證參數', () => {
        const payPalPayment = factory.createPayment('PayPal', {
            email: 'john.doe@example.com'
        });
        expect(payPalPayment.process(300)).toBe('Processing PayPal payment of 300 for john.doe@example.com');
    });

    // 測試當 PayPalPayment 缺少必要參數時的錯誤處理
    it('應該拋出錯誤當 PayPalPayment 缺少參數時', () => {
        expect(() => factory.createPayment('PayPal', {})).toThrow('Invalid parameters for PayPalPayment');
    });

    // 測試傳入未知支付方式時的錯誤處理
    it('應該在傳入未知支付方式時拋出錯誤', () => {
        expect(() => factory.createPayment('Bitcoin', {})).toThrow('Unknown payment method');
    });

    // 測試工廠的可擴展性
    it('應該能夠輕鬆地擴展以支持新的支付方式', () => {
        class NewPaymentMethod extends Payment {
            constructor({ newParam }) {
                super();
                this.newParam = newParam;
            }
            process(amount) {
                return `Processing new payment method of ${amount} with ${this.newParam}`;
            }
        }
        factory.registerPaymentMethod('NewPaymentMethod', NewPaymentMethod);
        const newPayment = factory.createPayment('NewPaymentMethod', { newParam: 'example' });
        expect(newPayment.process(500)).toBe('Processing new payment method of 500 with example');
    });

    // 測試工廠對異常情況的處理
    it('應該在傳入 null 作為選項時拋出錯誤', () => {
        expect(() => factory.createPayment('CreditCard', null)).toThrow('Invalid options provided');
    });

    it('應該在傳入 undefined 作為選項時拋出錯誤', () => {
        expect(() => factory.createPayment('CreditCard', undefined)).toThrow('Invalid options provided');
    });

    // 測試對象的正確類型
    it('應該創建正確類型的對象', () => {
        const creditCardPayment = factory.createPayment('CreditCard', {
            cardNumber: '1234567890123456',
            cardHolder: 'John Doe',
            expirationDate: '12/25'
        });
        expect(creditCardPayment).toBeInstanceOf(CreditCardPayment);

        const bankTransferPayment = factory.createPayment('BankTransfer', {
            accountNumber: '9876543210',
            bankCode: '123456789'
        });
        expect(bankTransferPayment).toBeInstanceOf(BankTransferPayment);

        const payPalPayment = factory.createPayment('PayPal', {
            email: 'john.doe@example.com'
        });
        expect(payPalPayment).toBeInstanceOf(PayPalPayment);
    });
});