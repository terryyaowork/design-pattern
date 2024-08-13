/**
 * Strategy Pattern 測試總結
 * 
 * 這些測試的目的是確保策略模式能夠正確地處理不同的支付策略，
 * 並在驗證失敗或成功的情況下進行相應的處理。
 * 
 * 測試情境包括：
 * 
 * 1. **策略驗證測試：**
 *    - 測試每個策略（CreditCardStrategy、PayPalStrategy、BankTransferStrategy）是否能夠正確驗證傳入的參數。
 *    - 確保在參數有效時，策略能夠正確執行，並且不會拋出異常。
 * 
 * 2. **驗證失敗時的錯誤處理：**
 *    - 測試當策略的參數無效或不完整時，系統是否能夠正確拋出相應的錯誤。
 *    - 這包括檢查每個支付方式的關鍵參數是否存在，以及它們是否符合預期格式。
 * 
 * TODO: 新增高並發情境下的策略執行測試，評估系統效能瓶頸。
 * TODO: 考慮加入更多錯誤處理與異常情況的測試，如網路失敗或支付系統崩潰等情境。
 * TODO: 測試每個策略在異常條件下的表現，比如極端資料、模擬網路延遲或支付失敗等。
 */

const {
    PaymentContext,
    CreditCardStrategy,
    PayPalStrategy,
    BankTransferStrategy
} = require('../../../src/behavioral/strategy/index');

describe('Strategy Pattern with Validation', () => {
    /**
     * 測試 CreditCardStrategy 的正確驗證。
     * 確保 CreditCardStrategy 能夠正確處理有效的信用卡資訊。
     */
    it('應該正確驗證 CreditCardStrategy', () => {
        const creditCard = new CreditCardStrategy('1234567890123456', 'John Doe', '12/25');
        const context = new PaymentContext(creditCard);
        expect(() => context.executeStrategy(100)).not.toThrow(); // 驗證成功，應該不拋出異常
    });

    /**
     * 測試 CreditCardStrategy 驗證失敗的情況。
     * 當傳入無效的信用卡資訊時，應該拋出相應的錯誤。
     */
    it('應該拋出錯誤當 CreditCardStrategy 驗證失敗時', () => {
        const creditCard = new CreditCardStrategy('', 'John Doe', '12/25'); // 卡號為空，應該觸發錯誤
        const context = new PaymentContext(creditCard);
        expect(() => context.executeStrategy(100)).toThrow('Invalid credit card details');
    });

    /**
     * 測試 PayPalStrategy 的正確驗證。
     * 確保 PayPalStrategy 能夠正確處理有效的 PayPal 帳戶資訊。
     */
    it('應該正確驗證 PayPalStrategy', () => {
        const payPal = new PayPalStrategy('john.doe@example.com');
        const context = new PaymentContext(payPal);
        expect(() => context.executeStrategy(200)).not.toThrow(); // 驗證成功，應該不拋出異常
    });

    /**
     * 測試 PayPalStrategy 驗證失敗的情況。
     * 當傳入無效的 PayPal 帳戶資訊時，應該拋出相應的錯誤。
     */
    it('應該拋出錯誤當 PayPalStrategy 驗證失敗時', () => {
        const payPal = new PayPalStrategy(''); // 帳戶資訊為空，應該觸發錯誤
        const context = new PaymentContext(payPal);
        expect(() => context.executeStrategy(200)).toThrow('Invalid PayPal email');
    });

    /**
     * 測試 BankTransferStrategy 的正確驗證。
     * 確保 BankTransferStrategy 能夠正確處理有效的銀行轉帳資訊。
     */
    it('應該正確驗證 BankTransferStrategy', () => {
        const bankTransfer = new BankTransferStrategy('9876543210', '123456789');
        const context = new PaymentContext(bankTransfer);
        expect(() => context.executeStrategy(300)).not.toThrow(); // 驗證成功，應該不拋出異常
    });

    /**
     * 測試 BankTransferStrategy 驗證失敗的情況。
     * 當傳入無效的銀行轉帳資訊時，應該拋出相應的錯誤。
     */
    it('應該拋出錯誤當 BankTransferStrategy 驗證失敗時', () => {
        const bankTransfer = new BankTransferStrategy('', '123456789'); // 帳戶號為空，應該觸發錯誤
        const context = new PaymentContext(bankTransfer);
        expect(() => context.executeStrategy(300)).toThrow('Invalid bank transfer details');
    });

    /**
     * 測試 CreditCardStrategy 的卡號長度驗證。
     * 當信用卡號長度不正確時，應該拋出相應的錯誤。
     */
    it('應該拋出錯誤當 CreditCardStrategy 的卡號長度不正確時', () => {
        const creditCard = new CreditCardStrategy('123', 'John Doe', '12/25');
        const context = new PaymentContext(creditCard);
        expect(() => context.executeStrategy(100)).toThrow('Credit card number must be 16 digits long');
    });

    /**
     * 測試 PayPalStrategy 的 email 格式驗證。
     * 當 email 格式不正確時，應該拋出相應的錯誤。
     */
    it('應該拋出錯誤當 PayPalStrategy 的 email 格式不正確時', () => {
        const payPal = new PayPalStrategy('invalid-email'); // 這裡的 email 缺少 '@'
        const context = new PaymentContext(payPal);
        expect(() => context.executeStrategy(200)).toThrow('Invalid PayPal email');
    });

    /**
     * 測試 BankTransferStrategy 的帳號驗證。
     * 當銀行帳號不正確時，應該拋出相應的錯誤。
     */
    it('應該拋出錯誤當 BankTransferStrategy 的帳號不正確時', () => {
        const bankTransfer = new BankTransferStrategy('', '123456789');
        const context = new PaymentContext(bankTransfer);
        expect(() => context.executeStrategy(300)).toThrow('Invalid bank transfer details');
    });

    // TODO: 增加更多異常情況的測試，如極端資料、網路失敗等。
    // TODO: 將來可以考慮增加高並發測試，以測試策略模式在實際應用中的效能表現。
});
