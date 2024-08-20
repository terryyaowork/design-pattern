const OrderState = require('./OrderState');

class PaymentState extends OrderState {
    processOrder(orderContext) {
        console.log('訂單正在付款中。');
    }

    cancelOrder(orderContext) {
        console.log('訂單已付款，無法取消。');
    }

    payOrder(orderContext) {
        console.log('付款進行中...');
    }

    shipOrder(orderContext) {
        console.log('付款完成，訂單進入配送狀態。');
        orderContext.setState(orderContext.deliveredState);
    }
}

module.exports = PaymentState;