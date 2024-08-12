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

    // 共同方法的具體實現
    process(amount) {
        return `Processing credit card payment of ${amount} for card holder ${this.cardHolder}`;
    }

    // 特有方法，用於驗證信用卡
    validateCard() {
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

    // 共同方法的具體實現
    process(amount) {
        return `Processing bank transfer of ${amount} from account ${this.accountNumber}`;
    }

    // 特有方法，用於驗證銀行信息
    validateBankDetails() {
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

    // 共同方法的具體實現
    process(amount) {
        return `Processing PayPal payment of ${amount} for ${this.email}`;
    }
}

// 工廠類別，用於根據支付方式類型創建對應的支付對象
class PaymentFactory {
    static createPayment(method, options) {
        if (!options || typeof options !== 'object') {
            throw new Error('Invalid options provided');
        }

        switch (method) {
            case 'CreditCard':
                return new CreditCardPayment(options);
            case 'BankTransfer':
                return new BankTransferPayment(options);
            case 'PayPal':
                return new PayPalPayment(options);
            default:
                throw new Error('Unknown payment method');
        }
    }
}

module.exports = PaymentFactory;
