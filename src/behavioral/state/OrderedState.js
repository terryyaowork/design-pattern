const OrderState = require('./OrderState');

class OrderedState extends OrderState {
    processOrder(orderContext) {
        console.log('訂單正在處理。');
        orderContext.setState(orderContext.processingState);
    }

    cancelOrder(orderContext) {
        console.log('訂單已取消。');
        orderContext.setState(orderContext.cancelledState);
    }

    makePayment(orderContext) {
        console.log('訂單正在付款中。');
        orderContext.setState(orderContext.paymentState);
    }
}

module.exports = OrderedState;