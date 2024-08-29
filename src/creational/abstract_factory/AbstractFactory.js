class AbstractFactory {
    async createProductA() {
        throw new Error("This method should be overridden!");
    }

    async createProductB() {
        throw new Error("This method should be overridden!");
    }
}

module.exports = AbstractFactory;
