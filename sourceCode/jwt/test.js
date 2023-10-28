const jwt = require('./index');

const secret = "123456789abcdedf";
const token = jwt.sign({ id: 17, username: "xxyCoder" }, secret, { expiresIn: '1d' })
console.log(token);
console.log(jwt.verify(token, { secret }));