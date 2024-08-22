class CartHandler {
    constructor() {
        this.nextHandler = null;
    }

    setNext(handler) {
        this.nextHandler = handler;
        return handler;
    }

    async handle(request) {
        if (!request.cart || request.cart.length === 0) {
            throw new Error('購物車是空的，請加入商品');
        }

        console.log('購物車檢查通過');
        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        }

        // 這裡不用 await，因為已經是最後一個處理器
        return '購物車檢查通過';
    }
}

module.exports = CartHandler;