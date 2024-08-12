const ProductFactory = require('../../../src/creational/factory/index');

describe('Factory Pattern', () => {
    it('應該正確創建 CreditCardPayment 並驗證參數', () => {
        const creditCardPayment = ProductFactory.createPayment('CreditCard', {
            cardNumber: '1234567890123456',
            cardHolder: 'John Doe',
            expirationDate: '12/25'
        });
        expect(creditCardPayment.process(100)).toBe('Processing credit card payment of 100 for card holder John Doe');
        expect(creditCardPayment.validateCard()).toBe(true);
    });

    it('應該拋出錯誤當 CreditCardPayment 缺少參數時', () => {
        expect(() => ProductFactory.createPayment('CreditCard', {
            cardHolder: 'John Doe',
            expirationDate: '12/25'
        })).toThrow('Invalid parameters for CreditCardPayment');
    });

    it('應該正確創建 BankTransferPayment 並驗證參數', () => {
        const bankTransferPayment = ProductFactory.createPayment('BankTransfer', {
            accountNumber: '9876543210',
            bankCode: '123456789'
        });
        expect(bankTransferPayment.process(200)).toBe('Processing bank transfer of 200 from account 9876543210');
        expect(bankTransferPayment.validateBankDetails()).toBe(true);
    });

    it('應該拋出錯誤當 BankTransferPayment 缺少參數時', () => {
        expect(() => ProductFactory.createPayment('BankTransfer', {
            accountNumber: '9876543210'
        })).toThrow('Invalid parameters for BankTransferPayment');
    });

    it('應該正確創建 PayPalPayment 並驗證參數', () => {
        const payPalPayment = ProductFactory.createPayment('PayPal', {
            email: 'john.doe@example.com'
        });
        expect(payPalPayment.process(300)).toBe('Processing PayPal payment of 300 for john.doe@example.com');
    });

    it('應該拋出錯誤當 PayPalPayment 缺少參數時', () => {
        expect(() => ProductFactory.createPayment('PayPal', {})).toThrow('Invalid parameters for PayPalPayment');
    });

    it('應該在傳入未知支付方式時拋出錯誤', () => {
        expect(() => ProductFactory.createPayment('Bitcoin', {})).toThrow('Unknown payment method');
    });
});
