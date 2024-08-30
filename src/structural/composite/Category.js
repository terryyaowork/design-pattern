const ProductCategory = require('./ProductCategory');

class Category extends ProductCategory {
    constructor(name) {
        super();
        if (!name || typeof name !== 'string' || name.trim() === '') {
            throw new Error('Invalid category name');
        }

        this.name = name;
        this.children = [];
    }

    async getName() {
        return this.name;
    }

    async add(child) {
        if (child === null || child === undefined || !(child instanceof ProductCategory)) {
            throw new Error('Invalid child, it must be an instance of ProductCategory');
        }
        this.children.push(child);
    }

    async remove(category) {
        this.children = this.children.filter(child => child !== category);
    }

    async display(depth = 0) {
        console.log(`${'-'.repeat(depth)} ${await this.getName()}`);
        for (const child of this.children) {
            await child.display(depth + 2);
        }
    }
}

module.exports = Category;
