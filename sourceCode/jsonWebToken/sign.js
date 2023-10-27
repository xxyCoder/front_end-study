const ms = require('ms');
const jwa = require('jwa');
const util = require('util');
const { createSecretKey } = require('crypto')
let timestamp = null, encoding = "UTF-8";

function timespan(time) {
    if (typeof time === 'string') {
        var milliseconds = ms(time);
        if (typeof milliseconds === 'undefined') return;
        return Math.floor(timestamp + milliseconds / 1000);
    } else if (typeof time === 'number') {
        return time + timestamp;
    } else {
        return;
    }
}

function base64url(string, encoding) {
    return Buffer
        .from(string, encoding)
        .toString('base64')
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}

function jwsSecuredInput(header, payload, encoding) {
    encoding = encoding || 'utf8';
    var encodedHeader = base64url(toString(header), 'binary');
    var encodedPayload = base64url(toString(payload), encoding);
    return util.format('%s.%s', encodedHeader, encodedPayload);
}

function sign(opts) {
    const header = opts.header;
    const payload = opts.payload;
    const secretOrKey = opts.secret;
    const encoding = opts.encoding;
    const algo = jwa(header.alg);
    const securedInput = jwsSecuredInput(header, payload, encoding);
    const signature = algo.sign(securedInput, secretOrKey);
    return util.format('%s.%s', securedInput, signature);
}

module.exports = function (payload, secretOrPrivateKey, options) {
    timestamp = payload.iat || Math.floor(Date.now() / 1000);
    if (typeof options.expiresIn !== 'undefined' && typeof payload === 'object') {
        payload.exp = timespan(options.expiresIn, timestamp);
    }
    secretOrPrivateKey = createSecretKey(typeof secretOrPrivateKey === 'string' ? Buffer.from(secretOrPrivateKey) : secretOrPrivateKey)
    const header = Object.assign({ alg: options.algorithm || 'HS256' }, options.header);
    encoding = options.encoding || 'utf8';
    const signature = sign({ header, payload, secret: secretOrPrivateKey, encoding });
    return signature;
}