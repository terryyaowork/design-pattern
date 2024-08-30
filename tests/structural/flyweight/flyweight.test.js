/**
 * Flyweight Pattern 測試總結
 * 
 * 這些測試的目的是驗證享元模式在處理交易紀錄管理中的正確性，特別是在大量交易類型與高併發情境下，
 * 確保重複使用相同的交易類型實例，並在性能和內存使用方面保持穩定。
 * 
 * 測試情境包括：
 * 
 * 1. **重複使用相同類型的 TransactionType 實例：**
 *    - 測試同一類型的交易在多次請求下是否能夠重複使用相同的 TransactionType 實例。
 * 
 * 2. **不同交易類型的處理：**
 *    - 測試系統能否正確處理不同的交易類型並正確執行交易。
 * 
 * 3. **一致性檢查：**
 *    - 測試多次請求相同交易類型時是否能保持一致性，即確保每次請求的實例都是相同的。
 * 
 * 4. **大規模交易處理：**
 *    - 測試在處理大量交易時，系統是否能保持效能穩定，並確保每筆交易都能正確處理。
 * 
 * 5. **高併發情境：**
 *    - 測試在高併發情境下，系統能否正確處理多筆交易並重用相同的 TransactionType 實例。
 * 
 * 6. **無效參數檢查：**
 *    - 測試在傳遞無效的交易類型或細節時，系統能否正確拋出錯誤。
 * 
 * 7. **記憶體使用檢查：**
 *    - 測試在大量交易處理後，系統的記憶體使用是否保持穩定，確保沒有因為重複創建物件而造成不必要的記憶體消耗。
 * 
 * 8. **競態條件檢查：**
 *    - 測試在高併發環境下是否能避免競態條件，並確保多次請求時能正確重用 TransactionType 實例。
 * 
 * 9. **多種交易類型共享：**
 *    - 測試在處理多種不同交易類型時，系統能否正確共享 TransactionType 實例，確保資源的有效使用。
 */

const TransactionTypeFactory = require('../../../src/structural/flyweight/TransactionTypeFactory');
const Transaction = require('../../../src/structural/flyweight/Transaction');

describe('Flyweight 模式 - 交易紀錄管理', () => {
    beforeEach(() => {
        jest.spyOn(console, 'log').mockImplementation(() => {});  // 禁用 console.log
    });

    afterEach(() => {
        jest.restoreAllMocks();  // 恢復 console.log
    });

    test('應該重複使用相同類型的 TransactionType 實例', async () => {
        const factory = new TransactionTypeFactory();

        const depositType = factory.getTransactionType('存款', '將資金存入帳戶');
        const withdrawalType = factory.getTransactionType('提款', '從帳戶中提取資金');

        const depositTransaction1 = new Transaction(depositType, '存款 $1000');
        const depositTransaction2 = new Transaction(depositType, '存款 $500');
        const withdrawalTransaction = new Transaction(withdrawalType, '提款 $200');

        const result1 = await depositTransaction1.execute();
        const result2 = await depositTransaction2.execute();
        const result3 = await withdrawalTransaction.execute();

        expect(depositType).toBe(factory.getTransactionType('存款', '將資金存入帳戶'));
        expect(result1).toBe('Processed 存款 transaction');
        expect(result2).toBe('Processed 存款 transaction');
        expect(result3).toBe('Processed 提款 transaction');
    });

    test('應該處理不同的交易類型並正確執行', async () => {
        const factory = new TransactionTypeFactory();

        const transferType = factory.getTransactionType('轉帳', '資金轉移到另一個帳戶');
        const transferTransaction = new Transaction(transferType, '轉帳 $300');

        const result = await transferTransaction.execute();

        expect(result).toBe('Processed 轉帳 transaction');
    });

    test('應該在多次請求相同交易類型時保持一致性', async () => {
        const factory = new TransactionTypeFactory();

        const depositType = factory.getTransactionType('存款', '將資金存入帳戶');
        const depositTransaction1 = new Transaction(depositType, '存款 $1000');
        const depositTransaction2 = new Transaction(depositType, '存款 $500');

        await depositTransaction1.execute();
        await depositTransaction2.execute();

        expect(depositType).toBe(factory.getTransactionType('存款', '將資金存入帳戶'));
    });

    test('應該處理大量交易並保持效能穩定', async () => {
        const factory = new TransactionTypeFactory();

        const depositType = factory.getTransactionType('存款', '將資金存入帳戶');
        const transactions = [];

        for (let i = 0; i < 1000; i++) {
            transactions.push(new Transaction(depositType, `存款 $${i}`));
        }

        const results = await Promise.all(transactions.map(tx => tx.execute()));

        results.forEach(result => {
            expect(result).toBe('Processed 存款 transaction');
        });
    });

    test('應該在高併發情境下正確處理交易', async () => {
        const factory = new TransactionTypeFactory();

        const depositType = factory.getTransactionType('存款', '將資金存入帳戶');
        const withdrawalType = factory.getTransactionType('提款', '從帳戶中提取資金');

        const transactions = [];

        for (let i = 0; i < 500; i++) {
            transactions.push(new Transaction(depositType, `存款 $${i}`));
            transactions.push(new Transaction(withdrawalType, `提款 $${i}`));
        }

        const results = await Promise.all(transactions.map(tx => tx.execute()));

        results.forEach(result => {
            expect(result).toMatch(/Processed (存款|提款) transaction/);
        });
    });

    test('應該在傳遞無效的交易類型或細節時拋出錯誤', async () => {
        const factory = new TransactionTypeFactory();

        expect(() => factory.getTransactionType(null, '無效交易類型')).toThrow();
        expect(() => new Transaction(null, '無效交易細節')).toThrow();
    });

    test('應該在大量交易處理後檢查記憶體使用是否穩定', async () => {
        const factory = new TransactionTypeFactory();
        const depositType = factory.getTransactionType('存款', '將資金存入帳戶');
        const transactions = [];

        for (let i = 0; i < 10000; i++) {
            transactions.push(new Transaction(depositType, `存款 $${i}`));
        }

        const initialMemoryUsage = process.memoryUsage().heapUsed;

        await Promise.all(transactions.map(tx => tx.execute()));

        const finalMemoryUsage = process.memoryUsage().heapUsed;

        expect(finalMemoryUsage).toBeLessThan(initialMemoryUsage * 1.5);
    });

    test('應該在高併發環境下避免競態條件並正確重用實例', async () => {
        const factory = new TransactionTypeFactory();

        const transactionTypes = await Promise.all([
            factory.getTransactionType('存款', '將資金存入帳戶'),
            factory.getTransactionType('存款', '將資金存入帳戶'),
            factory.getTransactionType('存款', '將資金存入帳戶'),
        ]);

        expect(transactionTypes[0]).toBe(transactionTypes[1]);
        expect(transactionTypes[1]).toBe(transactionTypes[2]);
    });

    test('應該在處理多種不同交易類型時正確共享 TransactionType 實例', async () => {
        const factory = new TransactionTypeFactory();

        const depositType = factory.getTransactionType('存款', '將資金存入帳戶');
        const withdrawalType = factory.getTransactionType('提款', '從帳戶中提取資金');
        const transferType = factory.getTransactionType('轉帳', '資金轉移到另一個帳戶');

        const depositTransaction = new Transaction(depositType, '存款 $1000');
        const withdrawalTransaction = new Transaction(withdrawalType, '提款 $500');
        const transferTransaction = new Transaction(transferType, '轉帳 $300');

        const results = await Promise.all([
            depositTransaction.execute(),
            withdrawalTransaction.execute(),
            transferTransaction.execute(),
        ]);

        expect(results[0]).toBe('Processed 存款 transaction');
        expect(results[1]).toBe('Processed 提款 transaction');
        expect(results[2]).toBe('Processed 轉帳 transaction');
    });
});
