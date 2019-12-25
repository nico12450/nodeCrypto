const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const publicKeyPath = 'publicKey.pem';
const privateKeyPath = 'privateKey.pem';
const dataToEncrypt = 'données test';

let getPublicKey = function(){

    let absolutePath = path.resolve(publicKeyPath);
    return fs.readFileSync(absolutePath,'utf8');

}

let getPrivateKey = function(){

    let absolutePath = path.resolve(privateKeyPath);
    return fs.readFileSync(absolutePath,'utf8');

}

let publicEncrypt = function(dataToEncrypt, publicKey){

    let dataBuffer = Buffer.from(dataToEncrypt,'utf8');
    return crypto.publicEncrypt(publicKey,dataBuffer).toString('base64');

}

// let publicDecrypt = function(dataToDecrypt, publicKey){

//     let dataBuffer = Buffer.from(dataToDecrypt,'base64');
//     return crypto.publicDecrypt(publicKey,dataBuffer).toString('utf8');

// }

// let privateEncrypt = function(dataToEncrypt, privateKey, passPhrase){

//     let dataBuffer = Buffer.from(dataToEncrypt,'utf8');
//     return crypto.privateEncrypt({
//         key: privateKey.toString(),
//         passphrase: passPhrase,
//       }, dataBuffer).toString('base64');

// }

let privateDecrypt = function(dataToDecrypt, privateKey, passPhrase){

    let dataBuffer = Buffer.from(dataToDecrypt,'base64');
    return crypto.privateDecrypt({
        key: privateKey.toString(),
        passphrase: passPhrase,
      }, dataBuffer).toString('utf8');

}

let createSign = function(dataToSign, privateKey, passPhrase){

    let sign = crypto.createSign('SHA256');
    sign.update(Buffer.from(dataToSign, 'utf8'));
    return sign.sign({key:privateKey.toString(), passphrase: passPhrase, padding:crypto.constants.RSA_PKCS1_PSS_PADDING}).toString('base64');

}

let verifySign = function(signature, signedData, publicKey){

    const verify = crypto.createVerify('SHA256');
    verify.update(Buffer.from(signedData, 'utf8'));
    return verify.verify({key:publicKey, padding:crypto.constants.RSA_PKCS1_PSS_PADDING}, Buffer.from(signature, 'base64'));

}

module.exports = {

    getPublicKey: getPublicKey,
    getPrivateKey: getPrivateKey,
    createSign: createSign,
    verifySign: verifySign

}


// console.log(getPublicKey());
// console.log(getPrivateKey());



// let encryptedData = publicEncrypt(dataToEncrypt, getPublicKey());
// let decryptedData = privateDecrypt(encryptedData, getPrivateKey(), 'secretPhrase');

// console.log(encryptedData);
// console.log(decryptedData);
