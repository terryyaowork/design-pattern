const OrderState = require('./OrderState');

class CancelledOrderState extends OrderState {
    processOrder(orderContext) {
        console.log('訂單已取消，無法處理');
    }

    cancelOrder(orderContext) {
        console.log('訂單已取消');
    }

    payOrder(orderContext) {
        console.log('訂單已取消，無法進行付款。');
    }

    shipOrder(orderContext) {
        console.log('訂單已取消，無法進行配送。');
    }
}

module.exports = CancelledOrderState;