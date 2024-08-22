class PaymentHandler {
    constructor() {
        this.nextHandler = null;
    }

    setNext(handler) {
        this.nextHandler = handler;
        return handler;
    }
    
    async handle(request) {
        if (!request.paymentMethod || !request.availablePayments.includes(request.paymentMethod)) {
            throw new Error('無效的支付方式');
        }

        console.log('支付方式檢查通過');

        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        }

        return '支付方式檢查通過';
    }
}

module.exports = PaymentHandler;