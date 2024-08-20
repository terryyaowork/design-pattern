const OrderState = require('./OrderState');

class PendingOrderState extends OrderState {
    processOrder(orderContext) {
        console.log('訂單已進入處理狀態');
        orderContext.setState(orderContext.processingState);
    }

    cancelOrder(orderContext) {
        console.log('訂單已取消');
        orderContext.setState(orderContext.cancelledState);
    }
}

module.exports = PendingOrderState;