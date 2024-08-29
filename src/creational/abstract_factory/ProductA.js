class ProductA {
    constructor(name) {
        this.name = name;
    }

    async use() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(`Using product A: ${this.name}`);
            }, 1000);
        });
    }
}

module.exports = ProductA;
