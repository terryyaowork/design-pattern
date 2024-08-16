/**
 * Adapter Pattern 測試文件
 * 
 * 測試的邏輯和覆蓋的情境如下：
 * 
 * 1. **常規支付處理測試：**
 *    - 測試適配器能否通過舊系統處理常規支付，確保適配器基本功能的正確性。
 * 
 * 2. **不同金額支付測試：**
 *    - 測試適配器能否處理不同金額的支付，涵蓋小額、大額、零額的情況。
 * 
 * 3. **極限值測試：**
 *    - 測試適配器在極限值（最大值和最小值）情況下的支付處理，檢查系統是否能正常運行。
 * 
 * 4. **負值及無效數值處理測試：**
 *    - 測試適配器對負值、非數字、空值等無效輸入的錯誤處理能力，確保系統的健壯性。
 * 
 * 5. **批量支付測試：**
 *    - 測試適配器在短時間內多次調用支付方法的情況，模擬高頻交易場景，檢查系統的響應速度和穩定性。
 * 
 * 6. **異步支付測試：**
 *    - 測試適配器在異步情境下的支付行為，確保在非同步操作中系統能正確處理支付。
 * 
 * 7. **支付中斷情況測試：**
 *    - 模擬支付過程中的異常情況，檢查適配器能否正確處理錯誤並繼續後續的支付操作。
 * 
 * 8. **版本兼容性測試：**
 *    - 測試適配器在不同版本的舊支付系統中的兼容性，確保適配器能適應不同系統環境的變化。
 * 
 * TODO: 增加日誌測試
 *  - 在測試中增加對日誌記錄的檢查，確保支付過程中的所有關鍵步驟都能正確記錄。
 */

const PaymentAdapter = require('../../../src/structural/adapter/PaymentAdapter');

describe('Adapter Pattern', () => {
    beforeEach(() => {
        jest.spyOn(console, 'log').mockImplementation(() => {});  // 禁用 console.log
    });

    afterEach(() => {
        jest.restoreAllMocks();  // 恢復 console.log
    });

    // 測試適配器能否通過舊系統處理常規支付
    it('應該能夠通過適配器使用舊的支付系統', () => {
        const paymentProcessor = new PaymentAdapter();
        console.log = jest.fn();
        
        paymentProcessor.pay(100);
        
        expect(console.log).toHaveBeenCalledWith('Processing payment of $100 using the old payment system.');
    });

    // 測試適配器能否處理不同金額的支付
    it('應該能夠處理不同金額的支付', () => {
        const paymentProcessor = new PaymentAdapter();
        console.log = jest.fn();
        
        paymentProcessor.pay(200);
        paymentProcessor.pay(50);
        
        expect(console.log).toHaveBeenCalledWith('Processing payment of $200 using the old payment system.');
        expect(console.log).toHaveBeenCalledWith('Processing payment of $50 using the old payment system.');
    });

    // 測試極限值的支付
    it('應該能夠處理極限值的支付', () => {
        const paymentProcessor = new PaymentAdapter();
        console.log = jest.fn();
        
        paymentProcessor.pay(0);   // 測試支付 $0 的情況
        paymentProcessor.pay(10000); // 測試較大金額的支付
        
        expect(console.log).toHaveBeenCalledWith('Processing payment of $0 using the old payment system.');
        expect(console.log).toHaveBeenCalledWith('Processing payment of $10000 using the old payment system.');
    });

    // 測試負值或無效數值
    it('應該拋出錯誤當支付金額為負值時', () => {
        const paymentProcessor = new PaymentAdapter();
        expect(() => paymentProcessor.pay(-100)).toThrow('Amount must be a non-negative number');
    });

    it('應該拋出錯誤當支付金額為非數字時', () => {
        const paymentProcessor = new PaymentAdapter();
        expect(() => paymentProcessor.pay('invalid')).toThrow('Amount must be a non-negative number');
    });

    // 測試錯誤處理
    it('應該拋出錯誤當沒有傳入金額時', () => {
        const paymentProcessor = new PaymentAdapter();
        expect(() => paymentProcessor.pay()).toThrow('Amount is required to process payment');
    });

    // 測試最大和最小邊界值
    it('應該能夠處理最大和最小邊界值的支付', () => {
        const paymentProcessor = new PaymentAdapter();
        console.log = jest.fn();

        paymentProcessor.pay(Number.MAX_VALUE); // 最大值
        paymentProcessor.pay(Number.MIN_VALUE); // 最小值

        expect(console.log).toHaveBeenCalledWith(`Processing payment of $${Number.MAX_VALUE} using the old payment system.`);
        expect(console.log).toHaveBeenCalledWith(`Processing payment of $${Number.MIN_VALUE} using the old payment system.`);
    });

    // 批量支付測試
    it('應該能夠在短時間內多次調用支付方法', () => {
        const paymentProcessor = new PaymentAdapter();
        console.log = jest.fn();

        for (let i = 0; i < 10; i++) {
            paymentProcessor.pay(100 + i); // 測試多次支付操作
        }

        for (let i = 0; i < 10; i++) {
            expect(console.log).toHaveBeenCalledWith(`Processing payment of $${100 + i} using the old payment system.`);
        }
    });

    // 異步支付測試
    it('應該能夠正確處理異步支付過程中的行為', async () => {
        const paymentProcessor = new PaymentAdapter();
        console.log = jest.fn();

        await new Promise((resolve) => {
            setTimeout(() => {
                paymentProcessor.pay(500); // 異步支付操作
                resolve();
            }, 100);
        });

        expect(console.log).toHaveBeenCalledWith('Processing payment of $500 using the old payment system.');
    });

    // 支付中斷情況測試
    it('應該能夠正確處理支付過程中的異常情況', () => {
        const paymentProcessor = new PaymentAdapter();
        console.log = jest.fn();

        try {
            paymentProcessor.pay(null); // 模擬支付中斷情況
        } catch (error) {
            expect(error.message).toBe('Amount is required to process payment');
        }

        paymentProcessor.pay(100); // 再次進行正常支付
        expect(console.log).toHaveBeenCalledWith('Processing payment of $100 using the old payment system.');
    });

    // 不同舊系統版本的兼容性測試
    it('應該能夠處理不同版本的舊支付系統', () => {
        class OldPaymentSystemV2 {
            processPayment(amount) {
                console.log(`Processing payment of $${amount} using the old payment system V2.`);
            }
        }

        class PaymentAdapterV2 extends PaymentAdapter {
            constructor() {
                super();
                this.oldPaymentSystem = new OldPaymentSystemV2(); // 使用新版本的舊支付系統
            }
        }

        const paymentProcessor = new PaymentAdapterV2();
        console.log = jest.fn();

        paymentProcessor.pay(200);

        expect(console.log).toHaveBeenCalledWith('Processing payment of $200 using the old payment system V2.');
    });
});