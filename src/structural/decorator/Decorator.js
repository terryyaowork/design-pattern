const BasicCoffee = require('./BasicCoffee');

/**
 * Decorator 是一個抽象基類，用於為 Coffee 對象添加動態行為。
 */
class Decorator {
    /**
     * @param {BasicCoffee} coffee - 被裝飾的咖啡對象
     */
    constructor(coffee) {
        // 檢查 coffee 是否為 BasicCoffee 或 Decorator 的實例
        if (!(coffee instanceof BasicCoffee || coffee instanceof Decorator)) {
            throw new Error('Decorator expects an instance of BasicCoffee or Decorator');
        }
        this.coffee = coffee;
    }

    /**
     * 返回被裝飾對象的成本。
     * 子類可以在此基礎上添加額外的成本。
     * @returns {number}
     */
    cost() {
        return this.coffee.cost();
    }

    /**
     * 返回被裝飾對象的描述。
     * 子類可以在此基礎上添加額外的描述。
     * @returns {string}
     */
    description() {
        return this.coffee.description();
    }
}

module.exports = Decorator;