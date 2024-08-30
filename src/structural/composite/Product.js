const ProductCategory = require('./ProductCategory');

class Product extends ProductCategory {
    constructor(name) {
        super();
        if (!name || typeof name !== 'string' || name.trim() === '') {
            throw new Error('Invalid product name');
        }
        this.name = name;
    }

    async getName() {
        return this.name;
    }

    async display(depth = 0) {
        console.log(`${'-'.repeat(depth)} ${await this.getName()}`);
    }
}

module.exports = Product;
