const PendingOrderState = require('./PendingOrderState');
const ProcessingOrderState = require('./ProcessingOrderState');
const CancelledOrderState = require('./CancelledOrderState');
const PaymentState = require('./PaymentState');
const DeliveredState = require('./DeliveredState');
const CompletedState = require('./CompletedState');

class OrderContext {
    constructor() {
        this.pendingState = new PendingOrderState();
        this.processingState = new ProcessingOrderState();
        this.cancelledState = new CancelledOrderState();
        this.paymentState = new PaymentState();
        this.deliveredState = new DeliveredState();
        this.completedState = new CompletedState();
        
        this.state = this.pendingState;  // 初始狀態
    }

    setState(state) {
        this.state = state;
    }

    processOrder() {
        this.state.processOrder(this);
    }

    cancelOrder() {
        this.state.cancelOrder(this);
    }

    pendingOrder() {
        if (this.state.constructor.name === 'ProcessingOrderState') {
            console.log('無法回到 Pending 狀態');
        } else {
            this.state = new PendingOrderState(this);
        }
    }

    payOrder() {
        this.state.payOrder(this);
    }
    
    shipOrder() {
        this.state.shipOrder(this);
    }

    completeOrder() {
        this.state.completeOrder(this);
    }
}

module.exports = OrderContext;