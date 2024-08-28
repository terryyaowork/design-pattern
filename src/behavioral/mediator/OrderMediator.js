class OrderMediator {
    constructor(inventory, payment, shipping) {
        this.inventory = inventory;
        this.payment = payment;
        this.shipping = shipping;
    }

    async processOrder(order) {
        // 檢查庫存
        const stockResult = await this.inventory.checkStock(order.items);
        if (!stockResult) {
            console.error('庫存不足');
            return false; // 返回 false
        }
    
        // 處理支付
        const paymentResult = await this.payment.processPayment(order.totalAmount);
        if (!paymentResult) {
            console.error('支付失敗');
            return false; // 返回 false
        }
    
        // 處理配送
        try {
            await this.shipping.shipOrder(order.shippingAddress);
        } catch (error) {
            console.error(error.message);
            return false; // 捕獲錯誤並返回 false
        }
    
        return true;
    }
}

module.exports = OrderMediator;