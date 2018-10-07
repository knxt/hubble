const EthCrypto = require('eth-crypto');
const KeyValueStore = require('orbit-db-kvstore');

class HubStore extends KeyValueStore {

    constructor(ipfs, id, dbname, options = {}) {
      super(ipfs, id, dbname, options);
      this.type = HubStore.type;

      // TODO: tweak hubUrl to accept an orbitdb address

      // A keypair is generated for our cosigner
      const _keypair = EthCrypto.createIdentity();

      // a global nonce
      const nonce = 0;

      // We create a getter to allow access to our cosigner's address
      this.address = function() { return _keypair.address; }

      // We create a getter to allow access to our cosigner's pubkey
      this.publicKey = function() { return _keypair.publicKey; }

      // We create a function that signs withdrawals with our cosigner's privkey
      this.signTx = function(rawtx) {
        EthCrypto.signTransaction(rawtx, _keypair.privateKey);
      }
      
    }

    deposit (tx) {
      if (tx.to != this.address()) throw new Error('Tx was not sent to this Hub.');
      super.put(tx.from, {balance: depositBalance(tx.from, tx.value)});
    }

    transfers (check, sig) {
      if (check.to == this.address()) throw new Error('You cannot open a thread with the Hub.');
      if (check.from != recover(check, sig)) throw new Error();
      if (check.value <= super.get(check.from)) throw new Error();
      if (super.get(check) == true) throw new Error();
      const from = check.from;
      const to = check.to;
      const value = check.value;

      await super.get(from).
      then(balance => super.put(from, balance - value));

      await super.get(to).
      then(balance => super.put(to, balance + value));


      // add nonce
      super.put(check, true);
    }

    withdraw (withdrawRequest, sig) {
      if (withdrawRequest.from != recover(withdrawRequest, sig)) throw new Error();
      sendToPayee(withdrawRequest.from);
    }

    sendToPayee(to) {
      const rawtx = {
        from: this.address(), // sender address
        to: to, // receiver address
        value: super.get(to), // amount of wei we want to send
        nonce: Date.now(), // we convert the current timestamp into an integer for noncing
        gasPrice: 5000000000,
        gasLimit: 21000 // normal gasLimit for code-less transactions
      }

      return this.signTx(rawtx);
    }

    depositBalance(from, value) {
      const balance = await super.get(from);
      return balance - value;
    }

    // dw bout it
    put () {
      throw new Error();
    }

    // dw bout it
    set () {
      throw new Error();
    }

    /**
    * Returns a new channel id that is a random hex string.
    *
    * @returns {String} a random 32 byte channel ID.
    */
    static getNewChannelId () {
      const buf = crypto.randomBytes(32)
      const channelId = Web3.utils.bytesToHex(buf)
      return channelId
    }

    static get type () {
      return 'hubstore';
    }
}
