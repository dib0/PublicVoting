var config = require('../config.js');
var express = require('express');
var router = express.Router();
var utils = require('ethereumjs-util');

// Add Ethereum internals
var now = Date.now() / 1000 | 0;
var async = require('async'),
    Ethereum = require('ethereumjs-lib'),
    VM = Ethereum.VM,
    Account = Ethereum.Account,
    Transaction = Ethereum.Transaction,
    Trie = Ethereum.Trie,
    rlp = Ethereum.rlp;

//creating a trie that just resides in memory
var stateTrie = new Trie();

//create a new VM instance
var vm = new VM(stateTrie);

//we will use this later
var storageRoot;

//the private/public key pare. used to sign the transactions and generate the addresses
var secretKey = '3cd7232cd6f3fc66a57a6bedc1a8ed6c228fff0a327e169c2bcc5e869ed49511';
var publicKey = '0406cc661590d48ee972944b35ad13ff03c7876eae3fd191e8a2f77311b0a3c6613407b5005e63d7d8d76b89d5f900cde691497688bb281e07a5052ff61edebdc0';

//sets up the initial state and runs  the callback when complete
function setup() {
  //the address we are sending from
  var address = utils.pubToAddress(new Buffer(publicKey, 'hex'));

  //create a new account
  var account = new Account();

  //give the account some wei. 
  //This needs to be a `Buffer` or a string. all strings need to be in hex.
  account.balance = 'f00000000000000000';

  //store in the trie
  stateTrie.put(address, account.serialize());
}

//runs a transaction through the vm
function runTx(raw) {
  //create a new transaction out of the json
  
  var tx = new Transaction(raw);
  
  tx.sign(new Buffer(secretKey, 'hex'));

  //run the tx
  vm.runTx(tx, function(err, results) {
    var createdAddress = results.createdAddress;
    //log some results 
    console.log('gas used: ' + results.gasUsed.toString());
    if (createdAddress) console.log('address created: ' + createdAddress.toString('hex'));
  });
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Public voting' });
});

// Ethereum services
router.get('/api/createpayment', function(req, res, next) {
  var rawTx = {
    nonce: '00',
    gasPrice: '09184e72a000',
    gasLimit: '2710',
    data: '7f4e616d65526567000000000000000000000000000000000000000000000000003055307f4e616d6552656700000000000000000000000000000000000000000000000000557f436f6e666967000000000000000000000000000000000000000000000000000073661005d2720d855f1d9976f88bb10c1a3398c77f5573661005d2720d855f1d9976f88bb10c1a3398c77f7f436f6e6669670000000000000000000000000000000000000000000000000000553360455560df806100c56000396000f3007f726567697374657200000000000000000000000000000000000000000000000060003514156053576020355415603257005b335415603e5760003354555b6020353360006000a233602035556020353355005b60007f756e72656769737465720000000000000000000000000000000000000000000060003514156082575033545b1560995733335460006000a2600033545560003355005b60007f6b696c6c00000000000000000000000000000000000000000000000000000000600035141560cb575060455433145b1560d25733ff5b6000355460005260206000f3'
  };
  
  // Setup and run
  setup();
  runTx(rawTx);

  // Check the results
/*  var createdAddress = new Buffer('692a70d2e424a56d2c6c27aa97d1a86395877b3a', 'hex');

  //fetch the new account from the trie.
  stateTrie.get(createdAddress, function(err, val) {
    var account = new Account(val);

    storageRoot = account.stateRoot;

    console.log('------results------');
    console.log('nonce: ' + account.nonce.toString('hex'));
    console.log('blance in wei: ' + account.balance.toString('hex'));
    console.log('stateRoot: ' + storageRoot.toString('hex'));
    console.log('codeHash:' + account.codeHash.toString('hex'));
    console.log('-------------------');
  });*/
    
  res.json("OK");
});



// Bitcoin services
/*router.get('/api/createpayment', function(req, res, next) {
  // construct the payment details
  var details = new PaymentProtocol().makePaymentDetails();
  if (config.production)
    details.set('network', 'main');
  else
    details.set('network', 'test');
  
  // Payment amount in satoshis, in one or more Output objects
  var outputs = new PaymentProtocol().makeOutput();
  outputs.set('amount', 0);
  //outputs.set('script', script.toBuffer()); // public key to where the payment has to go: optional
  details.set('outputs', outputs.message);
  
  details.set('time', now);
  details.set('expires', now + 60 * 60 * 24);
  details.set('memo', 'Testing creating a payment request');
  details.set('payment_url', 'http://' + req.headers.host + '/api/paymentack');
  details.set('merchant_data', "Payment 20150308-01"); // identify the request for merchant recognition later on: hash BSN?

  // load the X509 certificate
  var certificates = new PaymentProtocol().makeX509Certificates();
  certificates.set('certificate', config.cert_file);
  // form the request
  var request = new PaymentProtocol().makePaymentRequest();
  request.set('payment_details_version', 1);
  request.set('pki_type', 'x509+sha256');
  request.set('pki_data', certificates.serialize());
  request.set('serialized_payment_details', details.serialize());
  //request.sign(config.cert_private_key);
  // serialize the request
  //var rawbody = request.serialize();

  res.json("OK");
});*/

module.exports = router;
