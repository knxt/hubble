const EthCrypto = require('eth-crypto');
const Store = require('orbit-db-store');

class HubStore extends Store {

    constructor(ipfs, id, dbname, options = {}) {
      super(ipfs, id, dbname, options);
      this.type = HubStore.type;

      // TODO: tweak hubUrl to accept an orbitdb address

      // A keypair is generated for our cosigner
      // QUESTION: : is the hubAddress the _keypair in our case?
      const _keypair = EthCrypto.createIdentity();

      // We create a getter to allow access to our cosigner's pubkey
      this.publicKey = function() { return _keypair.publicKey; }

      // We create a function that cosigns claims with our cosigner's privkey
      this.cosignThreadTx = function(tx) { }

      // TODO: get contractAddress
      this.connextAddress = '';

      // Web3 instance reads the chain for updates to channels
      this.web3 = options.web3;
    }

    joinChannel ({ hubDeposit, channelId }) {
      // NOTE: Submits a tx onchain to join a channel with a user

      // Can either sign a tx to submit onchain, or can actually fire of the tx
      // TODO: Sign tx object needed to join channelId
      // TODO: Using web3, we do sendTx() to push that signed tx to the chain
    }

    deposit (deposits, sender, recipient, tokenAddress) {

    }

    openThread ({ to, deposit, sender }) {

    }

    updateChannel ({ channelId, balanceA, balanceB, sender }) {

    }

    updateThread ({ threadId, balanceA, balanceB, sender }) {

    }

    closeThread (threadId, sender) {

    }

    closeThreads (threadIds, sender) {

    }

    closeThread (sender) {

    }

    cosignChannelUpdate () {

    }

    createThreadStateUpdate () {
      
    }

    static get type () {
      return 'hubstore';
    }
}
