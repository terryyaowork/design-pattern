const Decorator = require('./Decorator');

class SugarDecorator extends Decorator {
    cost() {
        return this.coffee.cost() + 1; // 添加糖後增加成本
    }

    description() {
        return `${this.coffee.description()} + Sugar`; // 添加糖後修改描述
    }
}

module.exports = SugarDecorator;
