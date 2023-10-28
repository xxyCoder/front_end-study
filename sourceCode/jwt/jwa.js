const { createHmac } = require('crypto');
const bufferEqual = require('buffer-equal-constant-time');

function fromBase64(base64) {
    return base64
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}

function bufferOrString(obj) {
    return Buffer.isBuffer(obj) || typeof obj === 'string';
}

function normalizeInput(thing) {
    if (!bufferOrString(thing))
        thing = JSON.stringify(thing);
    return thing;
}

function normalizeInput(thing) {
    if (!(Buffer.isBuffer(thing) || typeof thing === 'string')) {
        thing = JSON.stringify(thing);
    }
    return thing;
}

function createHmacSigner(bits) {
    return function sign(thing, secret) {
        thing = normalizeInput(thing);
        var hmac = createHmac('sha' + bits, secret);
        var sig = (hmac.update(thing), hmac.digest('base64'))
        return fromBase64(sig);
    }
}

function createHmacVerifier(bits) {
    return function verify(thing, signature, secret) {
        var computedSig = createHmacSigner(bits)(thing, secret);
        return bufferEqual(Buffer.from(signature), Buffer.from(computedSig));
    }
}

module.exports = function (algorithm) {
    const signerFactories = {
        hs: createHmacSigner
    };
    const verifierFactories = {
        hs: createHmacVerifier
    }
    const match = algorithm.match(/^(HS|RS)(256|384|512)$/);
    const algo = match[1].toLowerCase(), bits = match[2];
    return {
        sign: signerFactories[algo](bits),
        verify: verifierFactories[algo](bits)
    }
}