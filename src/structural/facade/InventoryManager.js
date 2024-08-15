/**
 * 庫存管理系統。
 * 負責管理商品庫存的鎖定、預訂和釋放操作。
 *
 * TODO:
 * - 將庫存檢查、鎖定、釋放等操作轉換為異步函數，避免在高併發場景下阻塞
 * - 增加庫存數據持久化，避免重啟服務時丟失庫存狀態
 * - 整合分布式鎖機制，防止多個實例同時操作導致超賣
 * - 增加庫存同步機制，支持分佈式庫存管理，確保數據一致性
 */
class InventoryManager {
    constructor() {
        // 初始化庫存數量
        this.inventory = {
            'item1': 10,
            'item2': 5
        };
        this.locks = {}; // 追蹤被鎖定的商品
    }

    /**
     * 鎖定商品庫存，防止多訂單同時扣減庫存。
     * 
     * @param {string} item - 商品名稱。
     * @param {number} quantity - 需求數量。
     * @returns {boolean} - 返回是否鎖定成功。
     */
    lockItem(item, quantity) {
        if (!this.locks[item]) this.locks[item] = 0;

        if (this.inventory[item] - this.locks[item] >= quantity) {
            this.locks[item] += quantity;
            console.log(`Locked ${quantity} of ${item}. Total locked: ${this.locks[item]}`);
            return true;
        } else {
            console.log(`Failed to lock ${quantity} of ${item}. Available: ${this.inventory[item] - this.locks[item]}`);
            return false;
        }
    }

    /**
     * 釋放商品庫存，解除鎖定。
     * 
     * @param {string} item - 商品名稱。
     * @param {number} quantity - 釋放數量。
     */
    unlockItem(item, quantity) {
        if (this.locks[item] && this.locks[item] >= quantity) {
            this.locks[item] -= quantity;
            console.log(`Unlocked ${quantity} of ${item}. Total locked: ${this.locks[item]}`);
        } else {
            console.log(`Unlock failed: Not enough locked quantity for ${item}`);
        }
    }

    /**
     * 預訂商品庫存。只有在成功鎖定後才真正減少庫存。
     * 
     * @param {string} item - 商品名稱。
     * @param {number} quantity - 需求數量。
     * @returns {boolean} - 返回預訂是否成功。
     */
    reserveItem(item, quantity) {
        if (this.locks[item] >= quantity) {
            this.inventory[item] -= quantity;
            this.locks[item] -= quantity; // 預訂時釋放對應的鎖定數量
            console.log(`Reserved ${quantity} of ${item}. Remaining: ${this.inventory[item]}`);
            return true;
        } else {
            console.log(`Insufficient stock for ${item}. Requested: ${quantity}, Available: ${this.inventory[item]}`);
            return false;
        }
    }

    /**
     * 釋放商品庫存。
     * 用於在訂單失敗時將庫存恢復。
     * 
     * @param {string} item - 商品名稱。
     * @param {number} quantity - 釋放數量。
     */
    releaseItem(item, quantity) {
        this.inventory[item] += quantity;
        console.log(`Released ${quantity} of ${item}. Current stock: ${this.inventory[item]}`);
    }
}

module.exports = InventoryManager;