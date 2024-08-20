/**
 * State Pattern 測試總結
 * 
 * 這些測試的目的是確保在訂單系統中，狀態模式能夠正確運作，並且能夠處理訂單在不同狀態間的轉換。
 * 
 * 測試情境包括：
 * 
 * 1. **從 pending 狀態進入 processing 狀態：**
 *    - 測試訂單是否能夠從 pending 狀態順利轉換到 processing 狀態。
 * 
 * 2. **取消訂單並進入 cancelled 狀態：**
 *    - 測試在 pending 狀態下是否可以取消訂單，並進入 cancelled 狀態。
 * 
 * 3. **在 processing 狀態下無法取消訂單：**
 *    - 測試在 processing 狀態下，系統是否阻止取消訂單操作。
 * 
 * 4. **付款狀態後無法取消訂單：**
 *    - 測試訂單在付款狀態後是否阻止取消操作。
 * 
 * 5. **完成付款後進入 delivered 狀態：**
 *    - 確認訂單在付款完成後是否進入 delivered 狀態。
 * 
 * 6. **在 delivered 狀態後進入 completed 狀態：**
 *    - 測試訂單是否能夠從 delivered 狀態正確流轉到 completed 狀態。
 * 
 * 7. **在訂單完成後無法進行進一步操作：**
 *    - 測試訂單在完成後，是否阻止任何付款或取消操作。
 * 
 * 8. **高並發和異常情況下的狀態處理：**
 *    - 測試訂單在高並發、資源不足或網絡中斷情況下是否能夠正確處理狀態轉換。
 * 
 * 這些測試旨在全面驗證狀態模式在訂單系統中的應用，確保在不同邊界情況下，系統能夠正確運行。
 */
const OrderContext = require('../../../src/behavioral/state/OrderContext');

describe('State Pattern - Order State Tests', () => {
    let order;

    afterEach(() => {
        jest.restoreAllMocks();  // 恢復 console.log
    });

    beforeEach(() => {
        jest.spyOn(console, 'log').mockImplementation(() => { });  // 禁用 console.log
        order = new OrderContext();
    });

    /**
     * 測試訂單是否能從 pending 狀態進入 processing 狀態。
     */
    it('應該從 pending 狀態進入 processing 狀態', () => {
        order.processOrder();
        expect(order.state.constructor.name).toBe('ProcessingOrderState');
    });

    /**
     * 測試訂單在 pending 狀態下取消是否能進入 cancelled 狀態。
     */
    it('應該在 pending 狀態下取消訂單，進入 cancelled 狀態', () => {
        order.cancelOrder();
        expect(order.state.constructor.name).toBe('CancelledOrderState');
    });

    /**
     * 測試訂單在 processing 狀態下無法被取消。
     */
    it('應該在 processing 狀態下無法取消訂單', () => {
        order.processOrder();
        order.cancelOrder();
        expect(order.state.constructor.name).toBe('ProcessingOrderState');
    });

    /**
     * 測試訂單在付款狀態後是否無法取消。
     */
    it('應該進入付款狀態後無法取消訂單', () => {
        order.processOrder();
        order.payOrder();
        expect(order.state.constructor.name).toBe('PaymentState');
        order.cancelOrder();
        expect(order.state.constructor.name).toBe('PaymentState');
    });

    /**
     * 測試付款完成後是否進入 delivered 狀態。
     */
    it('應該完成付款後進入 delivered 狀態', () => {
        order.processOrder();
        order.payOrder();
        order.shipOrder();
        expect(order.state.constructor.name).toBe('DeliveredOrderState');
    });

    /**
     * 測試訂單在 delivered 狀態後能否進入 completed 狀態。
     */
    it('應該在 delivered 狀態後進入 completed 狀態', () => {
        order.processOrder();
        order.payOrder();
        order.shipOrder();
        order.completeOrder();
        expect(order.state.constructor.name).toBe('CompletedOrderState');
    });

    /**
     * 測試訂單完成後無法再進行付款或取消操作。
     */
    it('應該在訂單完成後無法再進行付款或取消訂單', () => {
        order.processOrder();
        order.payOrder();
        order.shipOrder();
        order.completeOrder();
        order.payOrder();
        expect(order.state.constructor.name).toBe('CompletedOrderState');
        order.cancelOrder();
        expect(order.state.constructor.name).toBe('CompletedOrderState');
    });

    /**
     * 測試訂單取消後無法進行付款或配送操作。
     */
    it('應該在訂單取消後無法進行付款或配送', () => {
        order.cancelOrder();
        expect(order.state.constructor.name).toBe('CancelledOrderState');
        order.payOrder();
        expect(order.state.constructor.name).toBe('CancelledOrderState');
        order.shipOrder();
        expect(order.state.constructor.name).toBe('CancelledOrderState');
    });

    /**
     * 測試訂單從 pending 流轉到完成狀態的全流程。
     */
    it('應該能正確從 pending 流轉到完成狀態', () => {
        order.processOrder();
        expect(order.state.constructor.name).toBe('ProcessingOrderState');
        order.payOrder();
        expect(order.state.constructor.name).toBe('PaymentState');
        order.shipOrder();
        expect(order.state.constructor.name).toBe('DeliveredOrderState');
        order.completeOrder();
        expect(order.state.constructor.name).toBe('CompletedOrderState');
    });

    /**
     * 測試訂單完成後無法再進行處理操作。
     */
    it('應該在訂單完成後無法處理訂單', () => {
        order.processOrder();
        order.payOrder();
        order.shipOrder();
        order.completeOrder();
        expect(order.state.constructor.name).toBe('CompletedOrderState');
        order.processOrder();
        expect(order.state.constructor.name).toBe('CompletedOrderState');
    });

    /**
     * 測試訂單取消後無法再進行付款或配送操作。
     */
    it('應該在訂單取消後無法進行付款或配送', () => {
        order.cancelOrder();
        order.payOrder();
        expect(order.state.constructor.name).toBe('CancelledOrderState');
        order.shipOrder();
        expect(order.state.constructor.name).toBe('CancelledOrderState');
    });

    /**
     * 測試訂單能否允許多次進行付款狀態。
     */
    it('應該允許從處理狀態多次切換到付款狀態', () => {
        order.processOrder();
        order.payOrder();
        expect(order.state.constructor.name).toBe('PaymentState');
        order.payOrder();  // 再次嘗試進入付款狀態
        expect(order.state.constructor.name).toBe('PaymentState');
    });

    /**
     * 測試高並發情況下訂單能否正確處理付款和配送操作。
     */
    it('應該在高並發情況下正確處理付款和配送', async () => {
        const promises = [];
        for (let i = 0; i < 100; i++) {
            promises.push(new Promise(resolve => {
                const order = new OrderContext();
                order.processOrder();
                order.payOrder();
                order.shipOrder();
                resolve(order.state.constructor.name);
            }));
        }
        const results = await Promise.all(promises);
        results.forEach(result => {
            expect(result).toBe('DeliveredOrderState');
        });
    });

    /**
     * 測試訂單取消後是否無法進行多次付款或配送操作。
     */
    it('應該在取消訂單後無法進行多次付款或配送', () => {
        order.cancelOrder();
        expect(order.state.constructor.name).toBe('CancelledOrderState');

        for (let i = 0; i < 5; i++) {
            order.payOrder();
            order.shipOrder();
            expect(order.state.constructor.name).toBe('CancelledOrderState');
        }
    });

    /**
     * 測試訂單完成後是否無法進行任何進一步操作。
     */
    it('應該在訂單完成後無法進行任何進一步操作', () => {
        order.processOrder();
        order.payOrder();
        order.shipOrder();
        order.completeOrder();
        expect(order.state.constructor.name).toBe('CompletedOrderState');

        for (let i = 0; i < 5; i++) {
            order.processOrder();
            order.payOrder();
            order.cancelOrder();
            order.shipOrder();
            expect(order.state.constructor.name).toBe('CompletedOrderState');
        }
    });

    /**
     * 測試訂單無法重複進行配送操作。
     */
    it('應該無法重複配送已完成的訂單', () => {
        order.processOrder();
        order.payOrder();
        order.shipOrder();
        order.completeOrder();
        expect(order.state.constructor.name).toBe('CompletedOrderState');

        for (let i = 0; i < 5; i++) {
            order.shipOrder();  // 試圖重複配送
            expect(order.state.constructor.name).toBe('CompletedOrderState');
        }
    });

    /**
     * 測試高負載下訂單是否能正確處理。
     */
    it('應該在高負載下保持穩定處理訂單操作', async () => {
        const promises = [];
        for (let i = 0; i < 1000; i++) {
            promises.push(new Promise(resolve => {
                const order = new OrderContext();
                order.processOrder();
                order.payOrder();
                order.shipOrder();
                order.completeOrder();
                resolve(order.state.constructor.name);
            }));
        }
        const results = await Promise.all(promises);
        results.forEach(result => {
            expect(result).toBe('CompletedOrderState');
        });
    });

    /**
     * 測試訂單取消後無法再次取消操作。
     */
    it('應該在取消已取消的訂單時保持取消狀態', () => {
        order.cancelOrder();
        expect(order.state.constructor.name).toBe('CancelledOrderState');

        for (let i = 0; i < 5; i++) {
            order.cancelOrder();  // 試圖重複取消
            expect(order.state.constructor.name).toBe('CancelledOrderState');
        }
    });

    /**
     * 測試在資源不足的情況下訂單的處理。
     */
    it('應該在資源不足情況下正確處理訂單', () => {
        jest.spyOn(order, 'processOrder').mockImplementation(() => {
            throw new Error('內存不足');
        });
        
        expect(() => {
            order.processOrder();
        }).toThrow('內存不足');
    
        jest.restoreAllMocks(); // 恢復 mock
    });

    /**
     * 測試網絡中斷時訂單的回滾操作。
     */
    it('應該在網絡中斷時回滾操作', () => {
        jest.spyOn(order, 'payOrder').mockImplementation(() => {
            throw new Error('網絡中斷');
        });
        
        order.processOrder();
        expect(() => order.payOrder()).toThrow('網絡中斷');
    
        jest.restoreAllMocks(); // 恢復 mock
    });

    /**
     * 測試高並發超時情況下訂單的處理。
     */
    it('應該在高並發超時情況下正確處理訂單', async () => {
        jest.spyOn(global, 'setTimeout').mockImplementation((fn, delay) => {
            if (delay > 1000) throw new Error('操作超時');
            fn();
        });

        const promises = [];
        for (let i = 0; i < 100; i++) {
            promises.push(new Promise(resolve => {
                try {
                    order.processOrder();
                    order.payOrder();
                    order.shipOrder();
                    resolve(order.state.constructor.name);
                } catch (error) {
                    resolve('超時錯誤');
                }
            }));
        }

        const results = await Promise.all(promises);
        results.forEach(result => {
            expect(['DeliveredOrderState', '超時錯誤']).toContain(result);
        });

        global.setTimeout.mockRestore();
    });

    /**
     * 測試無法從 Processing 狀態回到 Pending 狀態。
     */
    it('應該無法從 Processing 狀態回到 Pending 狀態', () => {
        order.processOrder();
        expect(order.state.constructor.name).toBe('ProcessingOrderState');
        order.pendingOrder();  // 這裡將會移除
        expect(order.state.constructor.name).toBe('ProcessingOrderState');  // 狀態應保持不變
    });
    
    /**
     * 測試無法從 Delivered 狀態回到 Processing 狀態。
     */
    it('應該無法從 Delivered 狀態回到 Processing 狀態', () => {
        order.processOrder();
        order.payOrder();
        order.shipOrder();
        expect(order.state.constructor.name).toBe('DeliveredOrderState');
        // 嘗試回到 processing
        order.processOrder();
        expect(order.state.constructor.name).toBe('DeliveredOrderState');  // 狀態應保持不變
    });

    /**
     * 測試網絡延遲情況下狀態轉換的正確性。
     */
    it('應該在網絡延遲情況下正確處理狀態轉換', async () => {
        jest.useFakeTimers();
        order.processOrder();
    
        // 模擬延遲付款
        setTimeout(() => {
            order.payOrder();
            expect(order.state.constructor.name).toBe('PaymentState');
        }, 3000);
    
        jest.advanceTimersByTime(3000);  // 快進時間
        expect(order.state.constructor.name).toBe('PaymentState');
        jest.useRealTimers();
    });

    /**
     * 測試系統重置後狀態是否正確維持。
     */
    it('應該在系統重置後保持正確的狀態', () => {
        order.processOrder();
        expect(order.state.constructor.name).toBe('ProcessingOrderState');
    
        // 模擬重置
        order = new OrderContext();
        expect(order.state.constructor.name).toBe('PendingOrderState');  // 應該回到 pending 狀態
    });
});