const connect = require('./utils/connect');
const inspectResponse = require('./utils/inspect-response');
const checkCredentials = require('./utils/check-credentials');

export async function sendMoney(options) {
    await checkCredentials(options.sender, options.networkId, options.keyStore);
    console.log(`Sending ${options.amount} NEAR to ${options.receiver} from ${options.sender}`);
    const near = await connect(options);
    const account = await near.account(options.sender);
    const result = await account.sendMoney(options.receiver, utils.format.parseNearAmount(options.amount));
    inspectResponse.prettyPrintResponse(result, options);
};