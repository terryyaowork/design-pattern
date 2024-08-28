class Shipping {
    async shipOrder(address) {
        // 模擬配送過程
        if (!address) {
            console.error('無效地址'); // 無效配送地址
        }
        return true; // 配送成功
    }
}

module.exports = Shipping;
