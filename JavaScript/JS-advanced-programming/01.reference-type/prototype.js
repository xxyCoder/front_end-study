function Person() { }
const p = new Person();

console.log("prototype:", Person.prototype, p.__proto__ === Person.prototype);
console.log("prototype.__proto__", Person.prototype.__proto__);
console.log("constructor", Person.prototype.constructor === Person, Person.constructor === Person.__proto__.constructor, Person.constructor === Function.constructor, Person.__proto__ === Function.prototype);