class ProductCategory {
    async getName() {
        throw new Error("This method should be overridden");
    }

    async add(category) {
        throw new Error("This method should be overridden");
    }

    async remove(category) {
        throw new Error("This method should be overridden");
    }

    async display(depth = 0) {
        throw new Error("This method should be overridden");
    }
}

module.exports = ProductCategory;
