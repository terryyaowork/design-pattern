class Inventory {
    constructor() {
        this.stock = {};
    }

    async checkStock(items) {
        // 模擬檢查庫存
        for (const item of items) {
            if (item.quantity > item.stock) {
                return false; // 庫存不足
            }
        }
        return true; // 庫存充足
    }

    addStock(itemName, quantity) {
        if (!this.stock[itemName]) {
            this.stock[itemName] = 0;
        }
        this.stock[itemName] += quantity;
    }

    getStock(itemName) {
        return this.stock[itemName] || 0;
    }

    reduceStock(itemName, quantity) {
        if (this.stock[itemName] >= quantity) {
            this.stock[itemName] -= quantity;
            return true;
        }
        return false;
    }
}

module.exports = Inventory;
