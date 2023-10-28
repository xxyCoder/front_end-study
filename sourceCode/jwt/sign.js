const { createSecretKey } = require('crypto');
const jwa = require('./jwa.js');
const util = require('util');
const ms = require('ms');

let timestamp = null;

function base64url(string, encoding) {
    return Buffer
        .from(string, encoding)
        .toString('base64') // 没有处理 = + \
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}

function jwsSecuredInput(header, payload, encoding) {
    const encodedHeader = base64url(JSON.stringify(header), encoding);
    const encodedPayload = base64url(JSON.stringify(payload), encoding);
    return util.format('%s.%s', encodedHeader, encodedPayload);
}

function jwsSign(opts) {
    const header = opts.header;
    const payload = opts.payload;
    const secretOrKey = opts.secret || opts.privateKey;
    const encoding = opts.encoding;
    const algo = jwa(header.alg);
    const securedInput = jwsSecuredInput(header, payload, encoding);
    const signature = algo.sign(securedInput, secretOrKey);
    return util.format('%s.%s', securedInput, signature);
}

function timespan(time, iat) {
    var timestamp = iat || Math.floor(Date.now() / 1000);

    if (typeof time === 'string') {
        var milliseconds = ms(time);
        if (typeof milliseconds === 'undefined') {
            return;
        }
        return Math.floor(timestamp + milliseconds / 1000);
    } else if (typeof time === 'number') {
        return timestamp + time;
    } else {
        return;
    }
};

module.exports = function (payload, secret, options) {
    options ??= {};
    const header = { alg: options.algorithm || "HS256", type: "JWT" };
    secret = createSecretKey(typeof secret === 'string' ? Buffer.from(secret) : secret);   // 创建并返回新的密钥对象
    timestamp = Math.floor(Date.now() / 1000);
    payload.exp = timespan(options.expiresIn, timestamp);
    payload.ita = timestamp;

    const encoding = options.encoding || "UTF-8";

    return jwsSign({ header, payload, secret, encoding });
}