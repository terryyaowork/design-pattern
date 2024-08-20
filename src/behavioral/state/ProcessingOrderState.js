const OrderState = require('./OrderState');

class ProcessingOrderState extends OrderState {
    processOrder(orderContext) {
        console.log('訂單正在處理。');
    }

    cancelOrder(orderContext) {
        console.log('訂單無法取消，已進入處理狀態');
    }

    payOrder(orderContext) {
        console.log('付款中...');
        orderContext.setState(orderContext.paymentState);
    }
}

module.exports = ProcessingOrderState;