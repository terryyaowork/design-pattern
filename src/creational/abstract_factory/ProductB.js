class ProductB {
    constructor(name) {
        this.name = name;
    }

    async use() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(`Using product B: ${this.name}`);
            }, 1000);
        });
    }
}

module.exports = ProductB;
