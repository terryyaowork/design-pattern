// Singleton 模式確保一個類只有一個實例，並提供一個全局訪問點。
class Singleton {
    constructor() {
        if (!Singleton.instance) {
            this._data = {}; // 用於保存狀態或配置的私有變數
            Singleton.instance = this; // 保存 Singleton 實例
        }
        return Singleton.instance; // 返回唯一實例
    }

    // Getter，用於獲取內部狀態
    getData(key) {
        return this._data[key];
    }

    // Setter，用於修改內部狀態
    setData(key, value) {
        this._data[key] = value;
    }

    // 範例方法，用於展示 Singleton 實例的功能
    someMethod() {
        return 'Hello, I am a singleton!';
    }
}

// 使用 Object.freeze 確保 Singleton 實例在創建後不再被修改
const instance = new Singleton();
Object.freeze(instance);

module.exports = instance;
