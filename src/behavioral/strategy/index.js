const PaymentContext = require('./PaymentContext');
const CreditCardStrategy = require('./CreditCardStrategy');
const PayPalStrategy = require('./PayPalStrategy');
const BankTransferStrategy = require('./BankTransferStrategy');

module.exports = {
    PaymentContext,
    CreditCardStrategy,
    PayPalStrategy,
    BankTransferStrategy,
};