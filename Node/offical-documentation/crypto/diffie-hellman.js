const crypto = require('crypto');

const primeLength = 1024;   // 素数p的长度
const generator = 5;    // 素数a的值

const client = crypto.createDiffieHellman(primeLength, generator);
const clientKey = client.generateKeys();    // 产生Ya，私有和公开的键值对

const server = crypto.createDiffieHellman(client.getPrime(), client.getGenerator());    // 拿到相同的素数a和p
const serverKey = server.generateKeys();

const clientSecret = client.computeSecret(serverKey);
const serverSecret = server.computeSecret(clientKey);

console.log(clientSecret.toString("hex"), "\n", serverSecret.toString("hex"));
