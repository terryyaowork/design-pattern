const OrderState = require('./OrderState');

class CompletedOrderState extends OrderState {
    processOrder(orderContext) {
        console.log('訂單已完成，無法進一步處理。');
    }

    cancelOrder(orderContext) {
        console.log('訂單已完成，無法取消。');
    }

    makePayment(orderContext) {
        console.log('訂單已完成，無法進行付款。');
    }

    payOrder(orderContext) {
        console.log('訂單已完成，無法進行付款。');
    }

    shipOrder(orderContext) {
        console.log('訂單已完成，無法進行配送。');
    }
}

module.exports = CompletedOrderState;