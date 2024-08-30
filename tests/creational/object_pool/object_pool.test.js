/**
 * Object Pool Pattern 測試文件
 * 
 * 測試的邏輯和覆蓋的情境如下：
 * 
 * 1. **連線池取得連線：**
 *    - 測試從連線池中成功取得一個連線，並檢查連線池狀態的變化。
 * 
 * 2. **釋放連線回連線池：**
 *    - 測試將已取得的連線釋放回連線池，並確認連線池狀態恢復。
 * 
 * 3. **從空的連線池取得連線：**
 *    - 測試當連線池中無可用連線時，取得連線操作是否正確拋出錯誤。
 * 
 * 4. **釋放非池內連線：**
 *    - 測試當釋放一個不屬於連線池的連線時，是否正確拋出錯誤。
 * 
 * 5. **多次取得與釋放連線：**
 *    - 測試多次取得與釋放連線，確保連線池的狀態能夠正確維護。
 * 
 * 6. **處理異步多連線請求：**
 *    - 測試在異步操作下的多個連線請求，確保系統能正確處理並返回錯誤。
 * 
 * 7. **大量連線請求處理：**
 *    - 測試在大量連線請求下，只有有限的連線成功取得，其他應正確拋出錯誤。
 * 
 * 8. **高併發下的連線處理：**
 *    - 測試在高併發情境下，系統能夠正確處理大量連線請求，並保持性能穩定。
 * 
 * 9. **連續釋放與取得操作性能穩定性：**
 *    - 測試在多次連續的釋放與取得連線操作下，系統性能的穩定性。
 * 
 * 10. **高併發下的內存使用穩定性：**
 *    - 測試在高併發情境下，系統內存使用是否能夠保持穩定，防止內存泄漏。
 */
const ConnectionPool = require('../../../src/creational/object_pool/ConnectionPool');
const Connection = require('../../../src/creational/object_pool/Connection');

describe('物件池模式 - 連線池', () => {
    let pool;

    afterEach(() => {
        jest.restoreAllMocks();  // 恢復 console.log
    });
    
    beforeEach(() => {
        jest.spyOn(console, 'log').mockImplementation(() => {});  // 禁用 console.log

        pool = new ConnectionPool(3);
    });

    it('應該能從連線池中取得一個連線', async () => {
        const connection = await pool.acquireConnection();
        expect(connection).toBeInstanceOf(Connection);
        expect(pool.getAvailableConnections()).toBe(2);
        expect(pool.getUsedConnections()).toBe(1);
    });

    it('應該能將連線釋放回連線池', async () => {
        const connection = await pool.acquireConnection();
        await pool.releaseConnection(connection);
        expect(pool.getAvailableConnections()).toBe(3);
        expect(pool.getUsedConnections()).toBe(0);
    });

    it('當嘗試從空的連線池取得連線時，應該拋出錯誤', async () => {
        await pool.acquireConnection();
        await pool.acquireConnection();
        await pool.acquireConnection();
        await expect(pool.acquireConnection()).rejects.toThrow('No available connections');
    });

    it('當釋放一個不屬於連線池的連線時，應該拋出錯誤', async () => {
        const fakeConnection = new Connection(99);
        await expect(pool.releaseConnection(fakeConnection)).rejects.toThrow('Connection not recognized');
    });

    it('應該能多次取得與釋放連線並保持狀態正確', async () => {
        const connection1 = await pool.acquireConnection();
        const connection2 = await pool.acquireConnection();
        await pool.releaseConnection(connection1);
        await pool.releaseConnection(connection2);

        expect(pool.getAvailableConnections()).toBe(3);
        expect(pool.getUsedConnections()).toBe(0);

        const connection3 = await pool.acquireConnection();
        expect(connection3).toBeInstanceOf(Connection);
        expect(pool.getAvailableConnections()).toBe(2);
        expect(pool.getUsedConnections()).toBe(1);
    });

    it('應該能處理異步多連線請求並正確返回錯誤', async () => {
        const acquirePromises = [
            pool.acquireConnection(),
            pool.acquireConnection(),
            pool.acquireConnection(),
            pool.acquireConnection() // 這個應該拋出錯誤
        ];

        await expect(Promise.all(acquirePromises)).rejects.toThrow('No available connections');

        expect(pool.getAvailableConnections()).toBe(0);
        expect(pool.getUsedConnections()).toBe(3);
    });

    it('應該在大量連線請求下正確處理', async () => {
        const acquirePromises = [];

        for (let i = 0; i < 100; i++) {
            acquirePromises.push(pool.acquireConnection().catch(error => error.message));
        }

        const results = await Promise.all(acquirePromises);

        const successCount = results.filter(result => result instanceof Connection).length;
        const errorCount = results.filter(result => result === 'No available connections').length;

        expect(successCount).toBe(3); // 只有 3 個連線應該成功
        expect(errorCount).toBe(97); // 其他 97 個應該拋出錯誤
        expect(pool.getAvailableConnections()).toBe(0);
        expect(pool.getUsedConnections()).toBe(3);
    });

    it('應該在高併發下正確處理大量連線請求', async () => {
        const acquirePromises = [];
    
        for (let i = 0; i < 1000; i++) {
            acquirePromises.push(pool.acquireConnection().catch(error => error.message));
        }
    
        const startTime = Date.now();
        const results = await Promise.all(acquirePromises);
        const endTime = Date.now();
    
        const successCount = results.filter(result => result instanceof Connection).length;
        const errorCount = results.filter(result => result === 'No available connections').length;
    
        expect(successCount).toBe(3); // 池中有3個連線應該成功
        expect(errorCount).toBe(997); // 其他997個應該拋出錯誤
        expect(pool.getAvailableConnections()).toBe(0);
        expect(pool.getUsedConnections()).toBe(3);
    
        const executionTime = endTime - startTime;
        console.log(`Execution time for 1000 requests: ${executionTime}ms`);
        expect(executionTime).toBeLessThan(500); // 設定一個合理的時間限制
    });    

    it('應該在連續的釋放與取得操作下保持性能穩定', async () => {
        const iterations = 10000;
    
        const startTime = Date.now();
    
        for (let i = 0; i < iterations; i++) {
            const connection = await pool.acquireConnection();
            await pool.releaseConnection(connection);
        }
    
        const endTime = Date.now();
    
        const executionTime = endTime - startTime;
        console.log(`Execution time for ${iterations} acquire and release operations: ${executionTime}ms`);
        expect(executionTime).toBeLessThan(1000); // 設定一個合理的時間限制
        expect(pool.getAvailableConnections()).toBe(3); // 確保連線池已完全釋放
        expect(pool.getUsedConnections()).toBe(0);
    });

    it('應該在高併發下保持內存使用穩定', async () => {
        const acquirePromises = [];

        for (let i = 0; i < 5000; i++) {
            acquirePromises.push(pool.acquireConnection().catch(error => error.message));
        }

        const initialMemoryUsage = process.memoryUsage().heapUsed;
        await Promise.all(acquirePromises);
        const finalMemoryUsage = process.memoryUsage().heapUsed;

        const memoryIncrease = finalMemoryUsage - initialMemoryUsage;
        console.log(`Memory usage increased by: ${memoryIncrease} bytes`);

        expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024); // 設定一個合理的內存增加限制，例如 50MB
    });
});

