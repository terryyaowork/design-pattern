// Singleton 模式確保一個類只有一個實例，並提供一個全局訪問點。
class Singleton {
    constructor() {
        // 檢查 Singleton 類是否已經有一個實例
        if (!Singleton.instance) {
            // 如果還沒有實例，則初始化一個新的實例
            this._data = {}; // 用於保存狀態或配置的私有變數
            Singleton.instance = this; // 保存 Singleton 實例
        }
        // 如果已經存在實例，則返回該實例
        return Singleton.instance; // 返回唯一實例
    }

    /**
     * 用於獲取內部狀態的值
     * @param {string} key - 鍵名，用於查詢對應的值
     * @returns {*} 對應鍵的值
     */
    getData(key) {
        return this._data[key];
    }

    /**
     * 用於設置內部狀態的值
     * @param {string} key - 鍵名，用於設置對應的值
     * @param {*} value - 要設置的值
     * @throws {Error} 當鍵或值為 null 時拋出錯誤
     */
    setData(key, value) {
        if (key == null || value == null) {
            throw new Error('Invalid key or value');
        }
        this._data[key] = value;
    }

    /**
     * 範例方法，展示 Singleton 實例的功能
     * @returns {string} - 一個描述 Singleton 的字符串
     */
    someMethod() {
        return 'Hello, I am a singleton!';
    }
}

// 使用 Object.freeze 確保 Singleton 實例在創建後不再被修改
const instance = new Singleton();
Object.freeze(instance);

module.exports = instance;

/**
 * TODO: 如果未來需要擴展 Singleton 模式（如延遲初始化或不同參數化的實例），應該考慮重新設計 Singleton 模式以滿足這些需求。
 * TODO: 目前的實例資料儲存結構為單一物件 _data，如果將來需要更複雜的資料結構或支援多種資料類型，則可能需要進一步封裝資料管理邏輯。
 * TODO: 當資料量或資料存取頻率較高時，可能需要考慮加入快取機制或優化資料存取方法的效能。
 */
