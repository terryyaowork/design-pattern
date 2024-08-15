const InventoryManager = require('./InventoryManager');
const PaymentProcessor = require('./PaymentProcessor');
const ShippingService = require('./ShippingService');

class InventoryError extends Error {}
class PaymentError extends Error {}
class ShippingError extends Error {}
class NetworkError extends Error {}
class PaymentPlatformError extends PaymentError {}

/**
 * TODO:
 * - 增加針對支付、配送和庫存檢查的重試機制，減少網絡異常導致的失敗
 * - 支持更多支付和配送系統的擴展，使用策略模式將不同支付和配送實現解耦
 * - 增加日誌系統，記錄訂單每個步驟的詳細狀態，特別是在錯誤情況下
 * - 實現訂單的並發控制，防止同一訂單多次處理或重複取消
 */
class OrderFacade {
    constructor() {
        this.inventoryManager = new InventoryManager();
        this.paymentProcessor = new PaymentProcessor();
        this.shippingService = new ShippingService();
        this.activeOrders = new Map();
        this.orderStatus = new Map();
    }

    async placeOrder(orderId, item, quantity, paymentAmount, address) {
        // 訂單初始化，狀態設為 "creating"
        this.orderStatus.set(orderId, { status: 'creating', timestamp: new Date() });
        
        // 將訂單提前加入 activeOrders，以便取消操作找到訂單
        this.activeOrders.set(orderId, { item, quantity, paymentAmount, address });
    
        try {
            // 在每個步驟前檢查訂單是否已取消
            if (this.orderStatus.get(orderId)?.status === 'canceled') {
                console.log(`Order ${orderId} was canceled before processing.`);
                return false;
            }
        
            // 鎖定庫存
            if (!this.inventoryManager.lockItem(item, quantity)) {
                throw new InventoryError('Item not available');
            }
            
            // 在支付前檢查是否已取消
            if (this.orderStatus.get(orderId)?.status === 'canceled') {
                console.log(`Order ${orderId} was canceled before payment.`);
                return false;
            }
    
            // 處理支付
            const paymentSuccess = await this.paymentProcessor.processPayment(orderId, paymentAmount);
            if (!paymentSuccess) {
                throw new PaymentPlatformError('Payment platform unavailable');
            }
    
            // 在運送前檢查是否已取消
            if (this.orderStatus.get(orderId)?.status === 'canceled') {
                console.log(`Order ${orderId} was canceled before shipping.`);
                return false;
            }
    
            // 配送商品
            const shippingSuccess = await this.shippingService.shipItem(item, quantity, address);
            if (!shippingSuccess) {
                throw new ShippingError('Shipping failed');
            }
    
            // 訂單完成
            this.orderStatus.set(orderId, { status: 'completed', timestamp: new Date(), details: 'Order completed successfully' });
            console.log('Order placed successfully.');
            return true;
    
        } catch (error) {
            console.log(`Order failed: ${error.message}`);
    
            // 支付失敗時，退款操作
            if (error instanceof PaymentError && this.paymentProcessor.paymentStatus.get(orderId) === 'success') {
                await this.paymentProcessor.refundPayment(paymentAmount);
            }
    
            // 釋放庫存
            this.inventoryManager.unlockItem(item, quantity);
    
            // 訂單失敗，狀態設為 "failed"
            this.orderStatus.set(orderId, { status: 'failed', timestamp: new Date(), error: error.message });
    
            // 將失敗訂單移到單獨的追蹤機制
            this.activeOrders.delete(orderId);
    
            return false;
        }
    }

    async cancelOrder(orderId) {
        const order = this.activeOrders.get(orderId);
        if (!order) {
            console.error('Cancel failed: Order not found.');
            return false;
        }
    
        const currentStatus = this.orderStatus.get(orderId)?.status || 'unknown';
    
        // 訂單狀態處於 creating 或者其他正在進行的狀態時也應該允許取消
        if (currentStatus === 'completed') {
            console.log('Cancel failed: Order already completed.');
            return false;
        }
    
        try {
            // 嘗試取消運送（如果已經開始運送）
            if (currentStatus !== 'creating') {
                const shipmentCanceled = await this.shippingService.cancelShipment(order.item, order.quantity);
                if (!shipmentCanceled) {
                    throw new ShippingError('Shipment cancellation failed.');
                }
            }
    
            // 嘗試退款（如果已經成功支付）
            if (this.paymentProcessor.paymentStatus.get(orderId) === 'success') {
                const refundSuccess = await this.paymentProcessor.refundPayment(order.paymentAmount);
                if (!refundSuccess) {
                    throw new PaymentError('Refund failed.');
                }
            }
    
            // 釋放庫存
            this.inventoryManager.unlockItem(order.item, order.quantity);
    
            // 刪除訂單並更新狀態
            this.activeOrders.delete(orderId);
            this.orderStatus.set(orderId, { status: 'canceled', timestamp: new Date() });
            console.log('Order canceled successfully.');
            return true;
    
        } catch (error) {
            console.log(`Cancel failed: ${error.message}`);
    
            // 如果取消運送或退款失敗，記錄錯誤狀態
            this.orderStatus.set(orderId, { status: 'cancel_failed', timestamp: new Date(), error: error.message });
            return false;
        }
    }
}

module.exports = {
    OrderFacade,
    PaymentPlatformError,
    NetworkError
};