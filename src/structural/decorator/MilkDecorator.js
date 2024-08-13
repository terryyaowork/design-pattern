const Decorator = require('./Decorator');

class MilkDecorator extends Decorator {
    cost() {
        return super.cost() + 2; // 使用 super 語法調用父類的 cost 方法
    }

    description() {
        return `${super.description()} + Milk`; // 使用 super 語法調用父類的 description 方法
    }
}

module.exports = MilkDecorator;