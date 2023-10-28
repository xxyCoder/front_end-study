const { headerFromJWS, payloadFromJWS, signatureFromJWS } = require('./utils')

function jwsDecode(jwsSig, opts) {
    const header = headerFromJWS(jwsSig);
    let payload = payloadFromJWS(jwsSig);
    payload = JSON.parse(payload, opts.encoding);
    const signature = signatureFromJWS(jwsSig, opts.encoding);

    return {
        header,
        payload,
        signature
    };
}

module.exports = function (jwt, options) {
    const decode = jwsDecode(jwt, options);
    return decode;
}