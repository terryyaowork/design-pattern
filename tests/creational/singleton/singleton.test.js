/**
 * Singleton Pattern 測試文件
 * 
 * 測試的邏輯和覆蓋的情境如下：
 * 
 * 1. **實例唯一性測試：**
 *    - 確保從多個不同地方獲取的實例總是相同的，驗證 Singleton 模式的核心特性。
 * 
 * 2. **方法執行測試：**
 *    - 測試 Singleton 類中方法的正確執行，確保方法能夠如預期運行。
 * 
 * 3. **數據保存與獲取測試：**
 *    - 測試 Singleton 類是否能正確保存和獲取數據，確保狀態的一致性。
 * 
 * 4. **實例凍結測試：**
 *    - 測試在 Singleton 實例被凍結後，是否能夠防止新增或修改屬性，保證實例的不可變性。
 */

const singleton = require('../../../src/creational/singleton/index');

describe('Singleton 模式測試', () => {
    
    // 測試 Singleton 實例的唯一性
    it('應該總是返回相同的實例', () => {
        const instance1 = require('../../../src/creational/singleton/index');
        const instance2 = require('../../../src/creational/singleton/index');
        expect(instance1).toBe(instance2); // 確認兩個實例是否相同
    });

    // 測試 Singleton 類中的方法是否能夠正確執行
    it('應該正確執行 someMethod 方法', () => {
        expect(singleton.someMethod()).toBe('Hello, I am a singleton!'); // 測試範例方法的輸出
    });

    // 測試數據的保存與獲取功能
    it('應該能夠保存和獲取數據', () => {
        singleton.setData('key', 'value'); // 設置數據
        expect(singleton.getData('key')).toBe('value'); // 測試數據是否正確保存和獲取
    });

    // 測試 Singleton 實例被凍結後是否不能新增或修改屬性
    it('應該不能修改已凍結的實例', () => {
        try {
            singleton.newProp = 'new'; // 嘗試新增屬性
        } catch (e) {
            console.log(e); // 捕獲異常
        }
        expect(singleton.newProp).toBeUndefined(); // 驗證屬性未被新增
    });

    // 測試 Singleton 是否能夠正確處理異常情況（例如：傳入無效參數）
    it('應該在處理無效參數時引發錯誤', () => {
        expect(() => {
            singleton.setData(null, 'value'); // 無效鍵
        }).toThrow();

        expect(() => {
            singleton.setData('key', null); // 無效值
        }).toThrow();
    });

    // 測試多執行緒情境下的 Singleton 性質
    it('應該在多執行緒情況下仍然保持唯一性', async () => {
        const getInstance = async () => require('../../../src/creational/singleton/index');
        const results = await Promise.all([getInstance(), getInstance(), getInstance()]);
        results.forEach(instance => {
            expect(instance).toBe(singleton); // 應該返回相同實例
        });
    });
});
