class DiscountHandler {
    constructor() {
        this.nextHandler = null;
    }

    setNext(handler) {
        this.nextHandler = handler;
        return handler;
    }

    async handle(request) {
        if (request.discountCode && !request.validDiscounts.includes(request.discountCode)) {
            throw new Error('無效的折扣碼');
        }

        console.log('折扣碼檢查通過');
        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        }

        return '折扣碼檢查通過';
    }
}

module.exports = DiscountHandler;