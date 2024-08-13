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
