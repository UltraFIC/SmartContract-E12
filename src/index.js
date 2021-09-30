import 'regenerator-runtime/runtime';

import { initContract, login, loginEmp, logout } from './utils';

import getConfig from './config';
const { networkId } = getConfig(process.env.NODE_ENV || 'development');

// global variable used throughout
let currentGreeting

const submitButton = document.querySelector('form button')

document.querySelector('form').onsubmit = async (event) => {
  event.preventDefault()

  // get elements from the form using their id attribute
  const { fieldset, greeting } = event.target.elements

  // disable the form while the value gets updated on-chain
  fieldset.disabled = true

  try {
    // make an update call to the smart contract
    await window.contract.setGreeting({
      // pass the value that the user entered in the greeting field
      message: greeting.value
    })
  } catch (e) {
    alert(
      'Something went wrong! ' +
      'Maybe you need to sign out and back in? ' +
      'Check your browser console for more info.'
    )
    throw e
  } finally {
    // re-enable the form, whether the call succeeded or failed
    fieldset.disabled = false
  }

  // disable the save button, since it now matches the persisted value
  submitButton.disabled = true

  // update the greeting in the UI
  await fetchGreeting()

  // show notification
  document.querySelector('[data-behavior=notification]').style.display = 'block'

  // remove notification again after css animation completes
  // this allows it to be shown again next time the form is submitted
  setTimeout(() => {
    document.querySelector('[data-behavior=notification]').style.display = 'none'
  }, 11000)
}

document.querySelector('input#greeting').oninput = (event) => {
  if (event.target.value !== currentGreeting) {
    submitButton.disabled = false
  } else {
    submitButton.disabled = true
  }
}

document.querySelector('#sign-in-button').onclick = login
document.querySelector('#sign-in-button-emp').onclick = loginEmp
document.querySelector('#sign-out-button').onclick = logout

// Display the signed-out-flow container
function signedOutFlow() {
  document.querySelector('#signed-out-flow').style.display = 'block'
}

// Displaying the signed in flow container and fill in account-specific data
function signedInFlow() {
  document.querySelector('#signed-in-flow').style.display = 'block'

  document.querySelectorAll('[data-behavior=account-id]').forEach(el => {
    el.innerText = window.accountId
  })

  // populate links in the notification box
  const accountLink = document.querySelector('[data-behavior=notification] a:nth-of-type(1)')
  accountLink.href = accountLink.href + window.accountId
  accountLink.innerText = '@' + window.accountId
  const contractLink = document.querySelector('[data-behavior=notification] a:nth-of-type(2)')
  contractLink.href = contractLink.href + window.contract.contractId
  contractLink.innerText = '@' + window.contract.contractId

  // update with selected networkId
  accountLink.href = accountLink.href.replace('testnet', networkId)
  contractLink.href = contractLink.href.replace('testnet', networkId)

  fetchGreeting()
}

// update global currentGreeting variable; update DOM with it
async function fetchGreeting() {
  currentGreeting = await contract.getGreeting({ accountId: window.accountId })
  document.querySelectorAll('[data-behavior=greeting]').forEach(el => {
    // set divs, spans, etc
    el.innerText = currentGreeting

    // set input elements
    el.value = currentGreeting
  })
}

// `nearInitPromise` gets called on page load
window.nearInitPromise = initContract()
  .then(() => {
    if (window.walletConnection.isSignedIn()) signedInFlow()
    else signedOutFlow()
  })
  .catch(console.error)


// ***********************************************
// const checkCredentials = require('./utils/check-credentials');
// const connect = require('./utils/connect');
// const inspectResponse = require('./utils/inspect-response');
// const checkCredentials = require('./utils/check-credentials');

// exports.sendMoney = async function (options) {
//   await checkCredentials(options.sender, options.networkId, options.keyStore);
//   console.log(`Sending ${options.amount} NEAR to ${options.receiver} from ${options.sender}`);
//   const near = await connect(options);
//   const account = await near.account(options.sender);
//   const result = await account.sendMoney(options.receiver, utils.format.parseNearAmount(options.amount));
//   inspectResponse.prettyPrintResponse(result, options);
// };

// const options = {
//   sender: "sender.testnet",
//   networkId: "testnet",
//   keyStore: "keyStore",
//   receiver: "receiver.testnet",
//   amount: "1.5"
// }

// console.log(sendMoney(options));





// // Integrate the payment gateway in line 20 to start accepting payments in NEAR.
// // Make sure you do not add extra spaces for code validation purposes.
// const nearAPI = require("near-api-js");
// const { connect, utils } = nearAPI;
// const { config } = require('./config'); // loads config settings

// // configure accounts, network, and amount of NEAR to send
// const sender = "sender.testnet";
// const receiver = "receiver.testnet";
// const networkId = "testnet";
// const amount = utils.format.parseNearAmount("1.5");

// async function main() {
//   // connect to NEAR! :)
//   const near = await connect(config);
//   // create a NEAR account object
//   const sender = await near.account(sender);

//   // TODO send those tokens here
//   const result =
//     console.log("Transaction Results: ", result.transaction);
// }
