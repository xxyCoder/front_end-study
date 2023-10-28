const decode = require('./decode');
const { signatureFromJWS, securedInputFromJWS } = require('./utils');
const { createSecretKey } = require('crypto');
const jwa = require('./jwa')

function jwsVerify(jwsSig, algorithm, secretOrKey) {
    var signature = signatureFromJWS(jwsSig);
    var securedInput = securedInputFromJWS(jwsSig);
    var algo = jwa(algorithm);
    return algo.verify(securedInput, signature, secretOrKey);
}

module.exports = function (jwtString, options) {
    options.encoding = options.encoding || "UTF-8";
    decodedToken = decode(jwtString, options);
    const header = decodedToken.header;
    const payload = decodedToken.payload;
    const clockTimestamp = options.clockTimestamp || Math.floor(Date.now() / 1000);
    let secret = options.secret;

    secret = createSecretKey(typeof secret === 'string' ? Buffer.from(secret) : secret);
    const valid = jwsVerify(jwtString, header.alg, secret);
    let timeout = false;
    if (clockTimestamp >= payload.exp + (options.clockTolerance || 0)) {
        timeout = true;
    }
    return {
        payload,
        header,
        valid,
        timeout
    }
}