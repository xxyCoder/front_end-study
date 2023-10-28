function isObject(thing) {
    return Object.prototype.toString.call(thing) === '[object Object]';
}

function safeJsonParse(thing) {
    if (isObject(thing))
        return thing;
    try { return JSON.parse(thing); }
    catch (e) { return undefined; }
}

function headerFromJWS(jwsSig) {
    const encodedHeader = jwsSig.split('.', 1)[0];
    return safeJsonParse(Buffer.from(encodedHeader, 'base64').toString('binary'));
}

function signatureFromJWS(jwsSig) {
    return jwsSig.split('.')[2];
}

function securedInputFromJWS(jwsSig) {
    return jwsSig.split('.', 2).join('.');
}

function payloadFromJWS(jwsSig, encoding) {
    var payload = jwsSig.split('.')[1];
    return Buffer.from(payload, 'base64').toString(encoding);
}

module.exports = {
    headerFromJWS,
    signatureFromJWS,
    payloadFromJWS,
    securedInputFromJWS
}