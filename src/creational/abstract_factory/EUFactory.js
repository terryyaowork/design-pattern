const AbstractFactory = require('./AbstractFactory');
const ProductA = require('./ProductA');
const ProductB = require('./ProductB');

class EUFactory extends AbstractFactory {
    async createProductA() {
        return new ProductA("EU Product A");
    }

    async createProductB() {
        return new ProductB("EU Product B");
    }
}

module.exports = EUFactory;
