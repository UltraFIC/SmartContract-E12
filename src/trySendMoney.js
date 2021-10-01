const { sendMoney } = require('./index');

const options = {
    sender: "sender.testnet",
    networkId: "testnet",
    keyStore: "keyStore",
    receiver: "receiver.testnet",
    amount: "1.5"
}

console.log(sendMoney(options));