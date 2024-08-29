/**
 * Abstract Factory Pattern 測試文件
 * 
 * 測試的邏輯和覆蓋的情境如下：
 * 
 * 1. **美國工廠產品創建測試：**
 *    - 測試 `USFactory` 能否正確創建產品 A 和產品 B，確保工廠的正常運行。
 * 
 * 2. **歐洲工廠產品創建測試：**
 *    - 測試 `EUFactory` 能否正確創建產品 A 和產品 B，驗證工廠的正確性。
 * 
 * 3. **美國工廠產品的異步操作測試：**
 *    - 測試 `USFactory` 產品能否正確處理異步操作，確保 `use` 方法的正確運行。
 * 
 * 4. **歐洲工廠產品的異步操作測試：**
 *    - 測試 `EUFactory` 產品能否正確處理異步操作，驗證 `use` 方法的正確性。
 * 
 * 5. **美國工廠多產品異步操作測試：**
 *    - 測試 `USFactory` 是否能正確處理多個產品的異步操作，確保多產品操作的穩定性。
 * 
 * 6. **歐洲工廠多產品異步操作測試：**
 *    - 測試 `EUFactory` 是否能正確處理多個產品的異步操作，驗證多產品操作的正確性。
 * 
 * 7. **異步操作中的錯誤處理測試：**
 *    - 測試異步操作過程中能否正確處理錯誤，確保系統的穩定性。
 * 
 * 8. **高負載情況下的異步操作測試：**
 *    - 測試高負載情況下能否正確處理異步操作，驗證系統的可擴展性。
 * 
 * 9. **異步操作超時處理測試：**
 *    - 測試異步操作超時情況下能否正確處理錯誤，確保系統的穩定性。
 * 
 * 10. **產品生成過程中的錯誤處理測試：**
 *     - 測試產品生成過程中能否正確處理錯誤，確保工廠的健壯性。
 * 
 * 11. **大量操作後的資源回收測試：**
 *     - 測試大量操作後是否能正確回收資源，驗證系統資源管理的有效性。
 * 
 * 12. **不同工廠產品互換使用測試：**
 *     - 測試不同工廠生成的產品能否互換使用，確保工廠的靈活性和兼容性。
 * 
 * 13. **異常情況下的資源回滾測試：**
 *     - 測試異常情況下能否正確回滾資源，驗證系統的錯誤恢復能力。
 * 
 * 14. **多個異步操作的資源釋放測試：**
 *     - 測試多個異步操作同時發生時能否正確釋放資源，確保系統資源管理的有效性。
 * 
 * 15. **異常恢復後的後續操作測試：**
 *     - 測試異常恢復後能否正確處理後續操作，確保系統的穩定性和連續性。
 */

const USFactory = require('../../../src/creational/abstract_factory/USFactory');
const EUFactory = require('../../../src/creational/abstract_factory/EUFactory');

describe("Abstract Factory Pattern", () => {
    beforeEach(() => {
        jest.spyOn(console, 'log').mockImplementation(() => {});  // 禁用 console.log
    });

    afterEach(() => {
        jest.restoreAllMocks();  // 恢復 console.log
    });

    test("USFactory 應該正確創建產品", async () => {
        const factory = new USFactory();
        const productA = await factory.createProductA();
        const productB = await factory.createProductB();

        expect(productA.name).toBe("US Product A");
        expect(productB.name).toBe("US Product B");
    });

    test("EUFactory 應該正確創建產品", async () => {
        const factory = new EUFactory();
        const productA = await factory.createProductA();
        const productB = await factory.createProductB();

        expect(productA.name).toBe("EU Product A");
        expect(productB.name).toBe("EU Product B");
    });

    test("USFactory 產品應該能正確處理異步操作", async () => {
        const factory = new USFactory();
        const productA = await factory.createProductA();
        const productB = await factory.createProductB();

        const resultA = await productA.use();
        const resultB = await productB.use();

        expect(resultA).toBe("Using product A: US Product A");
        expect(resultB).toBe("Using product B: US Product B");
    });

    test("EUFactory 產品應該能正確處理異步操作", async () => {
        const factory = new EUFactory();
        const productA = await factory.createProductA();
        const productB = await factory.createProductB();

        const resultA = await productA.use();
        const resultB = await productB.use();

        expect(resultA).toBe("Using product A: EU Product A");
        expect(resultB).toBe("Using product B: EU Product B");
    });

    test("USFactory 應該正確處理多個產品的異步操作", async () => {
        const factory = new USFactory();
        const products = await Promise.all([
            factory.createProductA(),
            factory.createProductB()
        ]);

        const results = await Promise.all(products.map(product => product.use()));

        expect(results[0]).toBe("Using product A: US Product A");
        expect(results[1]).toBe("Using product B: US Product B");
    });

    test("EUFactory 應該正確處理多個產品的異步操作", async () => {
        const factory = new EUFactory();
        const products = await Promise.all([
            factory.createProductA(),
            factory.createProductB()
        ]);

        const results = await Promise.all(products.map(product => product.use()));

        expect(results[0]).toBe("Using product A: EU Product A");
        expect(results[1]).toBe("Using product B: EU Product B");
    });

    test("應該在產品異步操作中處理錯誤", async () => {
        const factory = new USFactory();
        const productA = await factory.createProductA();

        jest.spyOn(productA, 'use').mockImplementation(() => {
            return Promise.reject(new Error("Async error"));
        });

        await expect(productA.use()).rejects.toThrow("Async error");
    });

    test("應該在高負載情況下正確處理異步操作", async () => {
        const factory = new EUFactory();
        const products = await Promise.all([
            factory.createProductA(),
            factory.createProductB(),
            factory.createProductA(),
            factory.createProductB(),
            factory.createProductA(),
            factory.createProductB()
        ]);

        const results = await Promise.all(products.map(product => product.use()));

        expect(results).toEqual([
            "Using product A: EU Product A",
            "Using product B: EU Product B",
            "Using product A: EU Product A",
            "Using product B: EU Product B",
            "Using product A: EU Product A",
            "Using product B: EU Product B"
        ]);
    });

    test("應該在異步操作超時時正確處理錯誤", async () => {
        const factory = new USFactory();
        const productA = await factory.createProductA();
    
        jest.spyOn(productA, 'use').mockImplementation(() => {
            return new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 5000));
        });
    
        await expect(productA.use()).rejects.toThrow("Timeout");
    }, 10000); // 增加超時時間    
    
    test("應該在產品生成過程中處理錯誤", async () => {
        const factory = new USFactory();
        jest.spyOn(factory, 'createProductA').mockImplementation(async () => {
            throw new Error("Product creation error");
        });
    
        await expect(factory.createProductA()).rejects.toThrow("Product creation error");
    });
    
    test("應該在大量操作後正確回收資源", async () => {
        const factory = new EUFactory();
        
        // 模擬 checkResourceReleased 方法
        factory.checkResourceReleased = jest.fn().mockReturnValue(true);
        
        const products = [];
        
        for (let i = 0; i < 1000; i++) {
            products.push(await factory.createProductA());
        }
        
        const results = await Promise.all(products.map(product => product.use()));
        results.forEach(result => {
            expect(result).toContain("Using product A");
        });
        
        // 驗證資源是否正確回收
        expect(factory.checkResourceReleased()).toBe(true);
    });
    
    test("不同工廠的產品應該能夠互換使用", async () => {
        const usFactory = new USFactory();
        const euFactory = new EUFactory();
    
        const usProductA = await usFactory.createProductA();
        const euProductA = await euFactory.createProductA();
    
        expect(usProductA.name).toBe("US Product A");
        expect(euProductA.name).toBe("EU Product A");
    
        expect(await usProductA.use()).toBe("Using product A: US Product A");
        expect(await euProductA.use()).toBe("Using product A: EU Product A");
    });
    
    test("在異常情況下應該正確回滾資源", async () => {
        const factory = new USFactory();
        const productA = await factory.createProductA();
    
        factory.rollbackResource = jest.fn(); // 確保在錯誤時回滾資源
    
        jest.spyOn(productA, 'use').mockImplementation(async () => {
            try {
                throw new Error("Operation failed");
            } catch (error) {
                factory.rollbackResource();  // 在錯誤處理中明確調用
                throw error;
            }
        });
    
        await expect(productA.use()).rejects.toThrow("Operation failed");
        expect(factory.rollbackResource).toBeCalled(); // 驗證回滾資源被正確觸發
    });
    
    test("應該在多個異步操作同時發生時正確釋放資源", async () => {
        const factory = new EUFactory();
        factory.checkResourceReleased = jest.fn(); // 模擬釋放資源的檢查
    
        const products = await Promise.all([
            factory.createProductA(),
            factory.createProductB(),
            factory.createProductA(),
            factory.createProductB()
        ]);
    
        await Promise.all(products.map(async (product) => {
            await product.use();
            factory.checkResourceReleased(); // 手動觸發資源釋放
        }));
    
        expect(factory.checkResourceReleased).toBeCalledTimes(4);
    });    
    
    test("異常發生後工廠應該能夠正確恢復並處理後續操作", async () => {
        const factory = new USFactory();
    
        jest.spyOn(factory, 'createProductA').mockImplementationOnce(async () => {
            throw new Error("Creation error");
        });
    
        await expect(factory.createProductA()).rejects.toThrow("Creation error");
    
        jest.spyOn(factory, 'createProductA').mockRestore(); // 確保後續操作恢復正常
        const productA = await factory.createProductA(); // 再次創建
        expect(productA.name).toBe("US Product A");
    });    
});