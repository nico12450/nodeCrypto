const { createSign } = require('./encryptDecrypt');
const { verifySign } = require('./encryptDecrypt');
const { getPublicKey } = require('./encryptDecrypt');
const { getPrivateKey } = require('./encryptDecrypt');

let makeTransaction = function(expediteurID, expediteurPublicKey, expediteurPrivateKey, receveurID, value, mdp){

    let id = Date.now();

    return {

        id: id,
        expediteurID: expediteurID,
        expediteurPublicKey: expediteurPublicKey,
        receveurID: receveurID,
        somme: value,
        signature: createSign('' + id + expediteurID + expediteurPublicKey + receveurID + value, expediteurPrivateKey, mdp)

    }

}

let verifyTransaction = function(transaction){

    return verifySign(transaction.signature, '' + transaction.id + transaction.expediteurID + transaction.expediteurPublicKey + transaction.receveurID + transaction.somme, transaction.expediteurPublicKey);

}

let firstTransaction = makeTransaction('1', getPublicKey(), getPrivateKey(), '2', 100, 'secretPhrase');
console.log(firstTransaction);
console.log(verifyTransaction(firstTransaction));