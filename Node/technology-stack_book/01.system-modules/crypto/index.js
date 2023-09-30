const assert = require('assert');
const crypto = require('crypto');
const fs = require('fs')

// HASH算法，其基本原理是将任意长度数据输入，最后输出固定长度的结果
function getFileHash(file) {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash("md5");
        const rs = fs.createReadStream(file);

        rs.on("readable", () => {
            const data = rs.read();
            if (data) {
                hash.update(data);
            }
        });
        rs.on("end", () => {
            resolve(hash.digest("hex"))
        })
    })
}

getFileHash("./file.txt")
    .then(val => console.log("md5 hash:", val))


const secret = crypto.randomBytes(32);
function encrypt(data) {
    // 第一个参数是加密算法
    // 第二个参数是密钥
    // 第三个参数是向量创建cipher加密对象
    const cipher = crypto.createCipheriv("aes-256-cbc", secret, Buffer.alloc(16, 0));

    // 第一个参数是要加密的数据
    // 第二个参数是数据格式
    // 第三个参数是加密后输出格式
    let encrypted = cipher.update(data, 'utf-8', 'hex');
    encrypted += cipher.final("hex");
    return encrypted;
}
const pswd = encrypt("xxyCoder")
console.log("Encrypted:", pswd)

// 逆解密
const decipher = crypto.createDecipheriv("aes-256-cbc", secret, Buffer.alloc(16, 0));
decipher.update(pswd, "hex", "utf-8");
console.log("Decipher:", decipher.final("utf-8"))

// 非对称加密
const privateKey = fs.readFileSync("./privateKey.pem");
const publicKey = fs.readFileSync("./publicKey.pem");

const content = "xxyCoder";
// 公钥加密
const encodeData = crypto.publicEncrypt(publicKey, Buffer.from(content));
console.log("encodeData:", encodeData);
// 私钥解密
const decodeData = crypto.privateDecrypt(privateKey, encodeData);
console.log("decodeData:", decodeData.toString("utf-8"));

// 签名和验证算法
const sign = crypto.createSign("sha256");
// 添加数据
sign.update("xxyCoder", "utf-8");
sign.end();
// 根据私钥，生成签名
const signature = sign.sign(privateKey, "hex");
// 借助公钥验证签名准确性
const verify = crypto.createVerify("sha256");
verify.update("xxyCoder", "utf-8");
verify.end();
assert.ok(verify.verify(publicKey, signature, "hex"))