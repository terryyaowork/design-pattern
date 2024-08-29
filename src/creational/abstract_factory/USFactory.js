const AbstractFactory = require('./AbstractFactory');
const ProductA = require('./ProductA');
const ProductB = require('./ProductB');

class USFactory extends AbstractFactory {
    async createProductA() {
        return new ProductA("US Product A");
    }

    async createProductB() {
        return new ProductB("US Product B");
    }
}

module.exports = USFactory;
