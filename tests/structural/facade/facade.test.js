/**
 * Facade Pattern 測試文件
 * 
 * 測試的邏輯和覆蓋的情境如下：
 * 
 * 1. **成功處理訂單：**
 *    - 測試完整訂單處理流程，確認訂單從下單到完成的每個步驟正確執行。
 * 
 * 2. **異常處理場景：**
 *    - 測試支付平台失敗情況，確認訂單正確取消並返回支付平台錯誤信息。
 *    - 測試庫存不足情況，確認訂單失敗並返回庫存不足的錯誤。
 *    - 測試配送失敗，確保訂單在配送失敗後正確取消並退款。
 *    - 測試網絡錯誤情況，確認訂單失敗並返回網絡錯誤。
 *    - 測試配送服務異常情況，確保訂單失敗並返回服務錯誤信息。
 * 
 * 3. **異步和高負載處理：**
 *    - 測試在支付過程中取消訂單，確認訂單在支付期間成功取消且最終未完成。
 *    - 測試同時多個訂單下單的場景，確保系統能夠正確處理高並發下單請求。
 *    - 測試高負載情況下的配送處理，模擬實際場景中多訂單同時配送的負載，確認系統能夠正確應對高負載情況。
 * 
 * 4. **邊界情況測試：**
 *    - 測試配送成功後無法取消訂單，確認一旦配送完成後無法再取消。
 *    - 測試支付成功但配送失敗的情況，確保訂單在配送失敗後正確取消並退款。
 */

const { OrderFacade, PaymentPlatformError, NetworkError } = require('../../../src/structural/facade/Facade');

describe('Facade Pattern - Order Processing Refactor', () => {
    let orderFacade;

    beforeEach(() => {
        jest.spyOn(console, 'log').mockImplementation(() => {});  // 禁用 console.log

        orderFacade = new OrderFacade();
    });

    afterEach(() => {
        jest.restoreAllMocks();  // 恢復 console.log
        jest.restoreAllMocks();  // 重置所有的 mock 函數
    });

    /**
     * 成功場景測試
     */
    describe('成功處理訂單', () => {
        it('應該成功處理訂單並完成所有步驟', async () => {
            const result = await orderFacade.placeOrder('order1', 'item1', 2, 100, '123 Main St');
            expect(result).toBe(true);

            const orderStatus = orderFacade.orderStatus.get('order1');
            expect(orderStatus.status).toBe('completed');
            expect(orderStatus.details).toBe('Order completed successfully');
        });
    });

    /**
     * 異常處理測試
     */
    describe('異常處理場景', () => {
        it('應該在支付平台失敗時返回錯誤並取消訂單', async () => {
            jest.spyOn(orderFacade.paymentProcessor, 'processPayment').mockImplementation(async () => {
                throw new PaymentPlatformError('Payment platform unavailable');
            });

            const result = await orderFacade.placeOrder('order2', 'item1', 1, 100, '123 Main St');
            expect(result).toBe(false);

            const orderStatus = orderFacade.orderStatus.get('order2');
            expect(orderStatus.status).toBe('failed');
            expect(orderStatus.error).toBe('Payment platform unavailable');
        });

        it('應該在庫存不足時取消訂單', async () => {
            const result = await orderFacade.placeOrder('order3', 'item2', 10, 100, '123 Main St');
            expect(result).toBe(false);

            const orderStatus = orderFacade.orderStatus.get('order3');
            expect(orderStatus.status).toBe('failed');
            expect(orderStatus.error).toBe('Item not available');
        });

        it('應該在配送失敗時取消訂單並退款', async () => {
            jest.spyOn(orderFacade.shippingService, 'shipItem').mockResolvedValue(false);
            
            const result = await orderFacade.placeOrder('order5', 'item1', 1, 100, '123 Main St');
            expect(result).toBe(false);
            
            const orderStatus = orderFacade.orderStatus.get('order5');
            expect(orderStatus.status).toBe('failed');
            expect(orderStatus.error).toBe('Shipping failed');
        });

        it('應該在網絡錯誤發生時正確回滾', async () => {
            jest.spyOn(orderFacade.paymentProcessor, 'processPayment').mockImplementation(async () => {
                throw new NetworkError('Network error occurred');
            });

            const result = await orderFacade.placeOrder('order10', 'item1', 1, 100, '123 Main St');
            
            expect(result).toBe(false);
            const orderStatus = orderFacade.orderStatus.get('order10');
            expect(orderStatus.status).toBe('failed');
            expect(orderStatus.error).toBe('Network error occurred');
        });

        it('應該在配送服務異常時正確取消訂單', async () => {
            jest.spyOn(orderFacade.shippingService, 'shipItem').mockImplementation(() => {
                throw new Error('Shipping service error');
            });
        
            const result = await orderFacade.placeOrder('order13', 'item1', 2, 100, '123 Main St');
        
            expect(result).toBe(false);
            const orderStatus = orderFacade.orderStatus.get('order13');
            expect(orderStatus.status).toBe('failed');
            expect(orderStatus.error).toBe('Shipping service error');
        });
    });

    /**
     * 異步和高負載測試
     */
    describe('異步和高負載處理', () => {
        it('應該在下單期間成功取消訂單', async () => {
            jest.spyOn(orderFacade.paymentProcessor, 'processPayment').mockImplementation(async () => {
                return new Promise((resolve) => setTimeout(() => resolve(true), 5000));
            });
          
            const placeOrderPromise = orderFacade.placeOrder('order4', 'item1', 1, 100, '123 Main St');
          
            await new Promise((resolve) => setTimeout(resolve, 1000));
          
            const cancelResult = await orderFacade.cancelOrder('order4');
            expect(cancelResult).toBe(true);
            expect(orderFacade.orderStatus.get('order4').status).toBe('canceled');
          
            const orderResult = await placeOrderPromise;
            expect(orderResult).toBe(false);
        }, 6000);

        it('應該能夠處理多個同時下單請求', async () => {
            jest.spyOn(orderFacade.inventoryManager, 'lockItem').mockResolvedValue(true);
            jest.spyOn(orderFacade.paymentProcessor, 'processPayment').mockResolvedValue(true);
            jest.spyOn(orderFacade.shippingService, 'shipItem').mockResolvedValue(true);
    
            const orders = [
                orderFacade.placeOrder('order7', 'item1', 2, 100, '123 Main St'),
                orderFacade.placeOrder('order8', 'item2', 1, 200, '456 Maple St'),
                orderFacade.placeOrder('order9', 'item3', 3, 300, '789 Oak St')
            ];
    
            const results = await Promise.all(orders);
    
            results.forEach((result, index) => {
                expect(result).toBe(true);
                const orderId = `order${index + 7}`;
                expect(orderFacade.orderStatus.get(orderId).status).toBe('completed');
            });
        });

        it('應該能夠在高負載情況下正確處理配送', async () => {
            jest.spyOn(orderFacade.shippingService, 'shipItem').mockResolvedValue(true);
            jest.spyOn(orderFacade.paymentProcessor, 'processPayment').mockResolvedValue(true);
            jest.spyOn(orderFacade.inventoryManager, 'lockItem').mockResolvedValue(true);
        
            const orders = [
                orderFacade.placeOrder('order14', 'item1', 2, 100, '123 Main St'),
                orderFacade.placeOrder('order15', 'item2', 1, 200, '456 Maple St'),
                orderFacade.placeOrder('order16', 'item3', 3, 300, '789 Oak St'),
                orderFacade.placeOrder('order17', 'item4', 4, 400, '987 Pine St')
            ];
        
            await new Promise((resolve) => setTimeout(resolve, 100));
        
            const results = await Promise.all(orders);
        
            results.forEach((result, index) => {
                expect(result).toBe(true);
                const orderId = `order${index + 14}`;
                expect(orderFacade.orderStatus.get(orderId).status).toBe('completed');
            });
        });
    });

    /**
     * 邊界情況測試
     */
    describe('邊界情況', () => {
        it('應該在配送成功後無法取消訂單', async () => {
            jest.spyOn(orderFacade.shippingService, 'shipItem').mockResolvedValue(true);
            await orderFacade.placeOrder('order11', 'item1', 2, 100, '123 Main St');
            const cancelResult = await orderFacade.cancelOrder('order11');
            expect(cancelResult).toBe(false);
            const orderStatus = orderFacade.orderStatus.get('order11');
            expect(orderStatus.status).toBe('completed');
        });

        it('應該在支付成功但配送失敗時取消訂單並退款', async () => {
            jest.spyOn(orderFacade.paymentProcessor, 'processPayment').mockResolvedValue(true);
            jest.spyOn(orderFacade.shippingService, 'shipItem').mockResolvedValue(false);
        
            const result = await orderFacade.placeOrder('order12', 'item1', 2, 100, '123 Main St');
            expect(result).toBe(false);
            const orderStatus = orderFacade.orderStatus.get('order12');
            expect(orderStatus.status).toBe('failed');
            expect(orderStatus.error).toBe('Shipping failed');
        });
    });
});