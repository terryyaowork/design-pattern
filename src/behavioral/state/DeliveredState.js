const OrderState = require('./OrderState');

class DeliveredOrderState extends OrderState {
    processOrder(orderContext) {
        console.log('訂單已配送，無法再處理。');
    }

    cancelOrder(orderContext) {
        console.log('訂單已配送，無法取消。');
    }

    makePayment(orderContext) {
        console.log('訂單已配送，無法進行付款。');
    }

    completeOrder(orderContext) {
        console.log('訂單已完成');
        orderContext.setState(orderContext.completedState);
    }
}

module.exports = DeliveredOrderState;