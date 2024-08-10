const singleton = require('../../../src/creational/singleton/index');

describe('Singleton 模式測試', () => {
    it('應該總是返回相同的實例', () => {
        const instance1 = require('../../../src/creational/singleton/index');
        const instance2 = require('../../../src/creational/singleton/index');
        expect(instance1).toBe(instance2); // 確認兩個實例是否相同
    });

    it('應該正確執行 someMethod 方法', () => {
        expect(singleton.someMethod()).toBe('Hello, I am a singleton!'); // 測試範例方法的輸出
    });

    it('應該能夠保存和獲取數據', () => {
        singleton.setData('key', 'value'); // 設置數據
        expect(singleton.getData('key')).toBe('value'); // 測試數據是否正確保存和獲取
    });

    it('應該不能修改已凍結的實例', () => {
        try {
            singleton.newProp = 'new'; // 嘗試新增屬性
        } catch (e) {
            console.log(e); // 捕獲異常
        }
        expect(singleton.newProp).toBeUndefined(); // 驗證屬性未被新增
    });
});
