const {
    PaymentContext,
    CreditCardStrategy,
    PayPalStrategy,
    BankTransferStrategy
} = require('../../../src/behavioral/strategy/index');

describe('Strategy Pattern with Validation', () => {
    it('應該正確驗證 CreditCardStrategy', () => {
        const creditCard = new CreditCardStrategy('1234567890123456', 'John Doe', '12/25');
        const context = new PaymentContext(creditCard);
        expect(() => context.executeStrategy(100)).not.toThrow();
    });

    it('應該拋出錯誤當 CreditCardStrategy 驗證失敗時', () => {
        const creditCard = new CreditCardStrategy('', 'John Doe', '12/25');
        const context = new PaymentContext(creditCard);
        expect(() => context.executeStrategy(100)).toThrow('Invalid credit card details');
    });

    it('應該正確驗證 PayPalStrategy', () => {
        const payPal = new PayPalStrategy('john.doe@example.com');
        const context = new PaymentContext(payPal);
        expect(() => context.executeStrategy(200)).not.toThrow();
    });

    it('應該拋出錯誤當 PayPalStrategy 驗證失敗時', () => {
        const payPal = new PayPalStrategy('');
        const context = new PaymentContext(payPal);
        expect(() => context.executeStrategy(200)).toThrow('Invalid PayPal email');
    });

    it('應該正確驗證 BankTransferStrategy', () => {
        const bankTransfer = new BankTransferStrategy('9876543210', '123456789');
        const context = new PaymentContext(bankTransfer);
        expect(() => context.executeStrategy(300)).not.toThrow();
    });

    it('應該拋出錯誤當 BankTransferStrategy 驗證失敗時', () => {
        const bankTransfer = new BankTransferStrategy('', '123456789');
        const context = new PaymentContext(bankTransfer);
        expect(() => context.executeStrategy(300)).toThrow('Invalid bank transfer details');
    });
});
