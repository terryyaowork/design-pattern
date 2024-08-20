class OrderState {
    processOrder(orderContext) {
        throw new Error("This method must be overridden by subclasses");
    }

    cancelOrder(orderContext) {
        throw new Error("This method must be overridden by subclasses");
    }

    payOrder(orderContext) {
        throw new Error("This method must be overridden by subclasses");
    }

    shipOrder(orderContext) {
        throw new Error("This method must be overridden by subclasses");
    }

    completeOrder(orderContext) {
        throw new Error("This method must be overridden by subclasses");
    }
}

module.exports = OrderState;