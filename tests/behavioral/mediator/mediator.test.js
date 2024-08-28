/**
 * Mediator Pattern 測試總結
 * 
 * 這些測試的目的是確保中介者模式能夠在訂單處理中有效運行，包括庫存檢查、支付、配送等功能的正確性。
 * 
 * 測試情境包括：
 * 
 * 1. **完整的訂單處理流程測試：**
 *    - 測試庫存檢查 -> 支付 -> 配送的完整訂單處理流程。
 * 
 * 2. **庫存不足的異常情境處理：**
 *    - 測試當商品庫存不足時是否能正確返回錯誤。
 * 
 * 3. **支付失敗情境處理：**
 *    - 測試當支付失敗時系統是否能正確回滾並停止流程。
 * 
 * 4. **無效訂單數據的異常處理：**
 *    - 測試無效訂單（如負金額、負庫存、無效地址等）時的系統行為。
 * 
 * 5. **高並發情境下的訂單處理測試：**
 *    - 測試多個訂單同時進行處理時系統能否正確並行操作。
 */
const OrderMediator = require('../../../src/behavioral/mediator/OrderMediator');
const Inventory = require('../../../src/behavioral/mediator/Inventory');
const Payment = require('../../../src/behavioral/mediator/Payment');
const Shipping = require('../../../src/behavioral/mediator/Shipping');

describe('Mediator Pattern - 訂單管理', () => {
    let orderMediator;
    let inventory;
    let payment;
    let shipping;

    beforeEach(() => {
        jest.spyOn(console, 'log').mockImplementation(() => { });  // 禁用 console.log
        jest.spyOn(console, 'error').mockImplementation(() => { });  // 禁用 console.error

        inventory = new Inventory();
        payment = new Payment();
        shipping = new Shipping();
        orderMediator = new OrderMediator(inventory, payment, shipping);
    });

    afterEach(() => {
        jest.restoreAllMocks();  // 恢復 console.log
    });

    // 1. 測試完整的訂單處理流程
    it('應該成功處理訂單', async () => {
        const order = {
            items: [{ name: '商品1', quantity: 2, stock: 5 }],
            totalAmount: 100,
            shippingAddress: '123 Main St'
        };

        const result = await orderMediator.processOrder(order);
        expect(result).toBe(true);
    });

    // 2. 測試庫存不足情況
    it('應該處理庫存不足情況', async () => {
        const order = {
            items: [{ name: '商品1', quantity: 10, stock: 5 }],
            totalAmount: 100,
            shippingAddress: '123 Main St'
        };

        const result = await orderMediator.processOrder(order);
        expect(result).toBe(false);
    });

    // 3. 測試支付失敗情況
    it('應該處理支付失敗情況', async () => {
        payment.processPayment = jest.fn(() => false);

        const order = {
            items: [{ name: '商品1', quantity: 2, stock: 5 }],
            totalAmount: 100,
            shippingAddress: '123 Main St'
        };

        const result = await orderMediator.processOrder(order);
        expect(result).toBe(false);
    });

    // 4. 測試無效訂單數據
    it('應該處理商品庫存為 0 的情況', async () => {
        const order = {
            items: [{ name: '商品1', quantity: 1, stock: 0 }],
            totalAmount: 100,
            shippingAddress: '123 Main St'
        };

        const result = await orderMediator.processOrder(order);
        expect(result).toBe(false);
    });

    it('應該處理庫存為負值的情況', async () => {
        const order = {
            items: [{ name: '商品1', quantity: 1, stock: -5 }],
            totalAmount: 100,
            shippingAddress: '123 Main St'
        };

        const result = await orderMediator.processOrder(order);
        expect(result).toBe(false);
    });

    it('應該處理負支付金額的情況', async () => {
        const order = {
            items: [{ name: '商品1', quantity: 2, stock: 5 }],
            totalAmount: -100, // 負數支付金額
            shippingAddress: '123 Main St'
        };

        const result = await orderMediator.processOrder(order);
        expect(result).toBe(false);
    });

    it('應該處理無效的配送地址', async () => {
        const order = {
            items: [{ name: '商品1', quantity: 2, stock: 5 }],
            totalAmount: 100,
            shippingAddress: '' // 無效地址
        };

        shipping.shipOrder = jest.fn(() => {
            throw new Error('無效地址');
        });

        const result = await orderMediator.processOrder(order);
        expect(result).toBe(false);
    });

    // 5. 測試高並發情境
    it('應該能在高並發情況下正確處理訂單', async () => {
        const orders = [
            { items: [{ name: '商品1', quantity: 2, stock: 5 }], totalAmount: 100, shippingAddress: '123 Main St' },
            { items: [{ name: '商品2', quantity: 1, stock: 10 }], totalAmount: 50, shippingAddress: '456 Oak St' },
            { items: [{ name: '商品3', quantity: 5, stock: 8 }], totalAmount: 300, shippingAddress: '789 Pine St' },
        ];

        const results = await Promise.all(orders.map(order => orderMediator.processOrder(order)));
        expect(results).toEqual([true, true, true]);
    });

    // 測試部分商品庫存不足的情況
    it('應該處理部分商品庫存不足的情況', async () => {
        const order = {
            items: [
                { name: '商品1', quantity: 2, stock: 5 },
                { name: '商品2', quantity: 3, stock: 1 } // 商品2 庫存不足
            ],
            totalAmount: 200,
            shippingAddress: '123 Main St'
        };

        const result = await orderMediator.processOrder(order);
        expect(result).toBe(false);  // 應該失敗
    });

    // 測試同時存在多種無效數據的情況
    it('應該處理同時存在多種無效數據的情況', async () => {
        const order = {
            items: [
                { name: '商品1', quantity: -1, stock: 5 },  // 負數庫存
                { name: '商品2', quantity: 2, stock: 1 }     // 庫存不足
            ],
            totalAmount: -100,  // 負支付金額
            shippingAddress: ''
        };

        const result = await orderMediator.processOrder(order);
        expect(result).toBe(false);  // 應該失敗
    });

    // 測試極大數量的訂單處理
    it('應該能處理極大量的訂單請求', async () => {
        const orders = Array(1000).fill({
            items: [{ name: '商品1', quantity: 1, stock: 5 }],
            totalAmount: 50,
            shippingAddress: '123 Main St'
        });

        const results = await Promise.all(orders.map(order => orderMediator.processOrder(order)));
        expect(results.every(result => result === true)).toBe(true);  // 應該成功
    });

    // 測試庫存扣除成功但支付失敗後的回滾情境
    it('應該在支付失敗後回滾庫存', () => {
        payment.processPayment = jest.fn(() => false);

        const order = {
            items: [{ name: '商品1', quantity: 2, stock: 5 }],
            totalAmount: 100,
            shippingAddress: '123 Main St'
        };

        // 先給商品添加庫存
        inventory.addStock('商品1', 5);

        const initialStock = inventory.getStock('商品1');
        orderMediator.processOrder(order);

        // 確保庫存沒有被扣除
        const finalStock = inventory.getStock('商品1');
        expect(finalStock).toBe(initialStock);
    });

    // 測試支付延遲情境
    it('應該處理支付延遲情境', async () => {
        payment.processPayment = jest.fn(() => new Promise((resolve) => setTimeout(() => resolve(true), 1000)));

        const order = {
            items: [{ name: '商品1', quantity: 1, stock: 5 }],
            totalAmount: 50,
            shippingAddress: '123 Main St'
        };

        const result = await orderMediator.processOrder(order);
        expect(result).toBe(true);  // 應該成功，即使支付有延遲
    });

    // 測試極大商品數量訂單
    it('應該處理極大商品數量訂單', async () => {
        const order = {
            items: [{ name: '商品1', quantity: Number.MAX_SAFE_INTEGER, stock: 1000000 }],
            totalAmount: 1000000,
            shippingAddress: '123 Main St'
        };
        const result = await orderMediator.processOrder(order);
        expect(result).toBe(false);  // 應該失敗，因為數量太大
    });

    it('應該在極高並發情況下正確處理訂單', async () => {
        const orders = Array(10000).fill({
            items: [{ name: '商品1', quantity: 1, stock: 50000 }],
            totalAmount: 50,
            shippingAddress: '123 Main St'
        });

        const results = await Promise.all(orders.map(order => orderMediator.processOrder(order)));
        expect(results.every(result => result === true)).toBe(true);
    });

    it('應該在配送準備後回滾支付失敗的訂單', () => {
        payment.processPayment = jest.fn(() => false);
        shipping.shipOrder = jest.fn(() => true);  // 配送已準備

        const order = {
            items: [{ name: '商品1', quantity: 2, stock: 5 }],
            totalAmount: 100,
            shippingAddress: '123 Main St'
        };

        const initialStock = inventory.getStock('商品1');
        orderMediator.processOrder(order);

        // 確保庫存回滾且配送沒有進行
        const finalStock = inventory.getStock('商品1');
        expect(finalStock).toBe(initialStock);
        expect(shipping.shipOrder).not.toHaveBeenCalled();  // 應該沒有進行配送
    });

    it('應該處理支付系統的網絡錯誤', async () => {
        payment.processPayment = jest.fn(() => new Promise((_, reject) => reject(new Error('網絡錯誤'))));

        const order = {
            items: [{ name: '商品1', quantity: 2, stock: 5 }],
            totalAmount: 100,
            shippingAddress: '123 Main St'
        };

        await expect(orderMediator.processOrder(order)).rejects.toThrow('網絡錯誤');
    });
});
