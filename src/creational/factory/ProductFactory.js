// 支付基類，定義共同方法
class Payment {
    process(amount) {
        throw new Error('process() must be implemented by subclasses');
    }
}

// 具體的支付方式類別：信用卡支付
class CreditCardPayment extends Payment {
    constructor({ cardNumber, cardHolder, expirationDate }) {
        super();
        if (!cardNumber || !cardHolder || !expirationDate) {
            throw new Error('Invalid parameters for CreditCardPayment');
        }
        this.cardNumber = cardNumber;
        this.cardHolder = cardHolder;
        this.expirationDate = expirationDate;
    }

    process(amount) {
        return `Processing credit card payment of ${amount} for card holder ${this.cardHolder}`;
    }

    validateCard() {
        // TODO: 考慮添加更多的卡號驗證邏輯，如 Luhn 算法驗證
        return this.cardNumber.length === 16;
    }
}

// 具體的支付方式類別：銀行轉賬支付
class BankTransferPayment extends Payment {
    constructor({ accountNumber, bankCode }) {
        super();
        if (!accountNumber || !bankCode) {
            throw new Error('Invalid parameters for BankTransferPayment');
        }
        this.accountNumber = accountNumber;
        this.bankCode = bankCode;
    }

    process(amount) {
        return `Processing bank transfer of ${amount} from account ${this.accountNumber}`;
    }

    validateBankDetails() {
        // TODO: 考慮添加更多的銀行代碼驗證邏輯，如檢查代碼格式或查詢有效性
        return this.bankCode.length === 9;
    }
}

// 具體的支付方式類別：PayPal 支付
class PayPalPayment extends Payment {
    constructor({ email }) {
        super();
        if (!email) {
            throw new Error('Invalid parameters for PayPalPayment');
        }
        this.email = email;
    }

    process(amount) {
        return `Processing PayPal payment of ${amount} for ${this.email}`;
    }

    // TODO: 考慮添加更多的電子郵件格式驗證邏輯
}

// 工廠類別，用於根據支付方式類型創建對應的支付對象
class PaymentFactory {
    constructor() {
        this.paymentMethods = {
            CreditCard: CreditCardPayment,
            BankTransfer: BankTransferPayment,
            PayPal: PayPalPayment,
        };
    }

    registerPaymentMethod(methodName, methodClass) {
        if (!methodName || !methodClass) {
            throw new Error('Invalid method name or class for registration');
        }
        this.paymentMethods[methodName] = methodClass;
    }

    createPayment(method, options) {
        // 檢查 options 是否為 null 或 undefined
        if (options == null) {
            throw new Error('Invalid options provided');
        }

        const PaymentMethod = this.paymentMethods[method];
        if (!PaymentMethod) {
            throw new Error('Unknown payment method');
        }
        return new PaymentMethod(options);
    }
}

// 將所有類別一起導出
module.exports = {
    Payment,
    CreditCardPayment,
    BankTransferPayment,
    PayPalPayment,
    PaymentFactory,
};
