class StockHandler {
    constructor() {
        this.nextHandler = null;
    }

    setNext(handler) {
        this.nextHandler = handler;
        return handler;
    }

    // 修改 handle 方法，返回 Promise
    async handle(request) {
        const outOfStockItems = request.cart.filter(item => item.stock === 0);
        const maxStockExceededItems = request.cart.filter(item => item.stock > 10000);

        if (outOfStockItems.length > 0) {
            throw new Error('有商品缺貨，請移除缺貨商品');
        }

        if (maxStockExceededItems.length > 0) {
            throw new Error('庫存超過最大值');
        }

        console.log('庫存檢查通過');
        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        }

        return '庫存檢查通過';
    }
}

module.exports = StockHandler;