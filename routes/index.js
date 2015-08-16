var config = require('../config.js');
var express = require('express');
var router = express.Router();

// Add Ethereum internals
var now = Date.now() / 1000 | 0;
var async = require('async'),
    Ethereum = require('ethereumjs-lib'),
    VM = Ethereum.VM,
    Account = Ethereum.Account,
    Transaction = Ethereum.Transaction,
    Trie = Ethereum.Trie,
    rlp = Ethereum.rlp;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Public voting' });
});

// Ethereum services
router.get('/api/createpayment', function(req, res, next) {
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
