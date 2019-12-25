const { generateKeyPair } = require('crypto');
const fs = require('fs');

generateKeyPair('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
    cipher: 'aes-256-cbc',
    passphrase: 'secretPhrase'
  }
}, (err, publicKey, privateKey) => {
  
    fs.writeFileSync('publicKey.pem', publicKey);
    fs.writeFileSync('privateKey.pem', privateKey);

});