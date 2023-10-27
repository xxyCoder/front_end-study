const jwt = require('./index');
console.log(jwt.sign({ name: "xxyCoder", id: 17 }, "secret1234567", { expiresIn: '1d' }));