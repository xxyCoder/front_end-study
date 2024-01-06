// @ts-check
let isCheck = 12
// console.log(isChecked) // 报错

// JSDoc

/**
 * @typedef {(string | number)} NumberLike
 */

/**
 * @param {string} message 
 * @param {NumberLike} age
 * @return {void}
 */
function sayHello(message, age) {

}

/**
 * @type {NumberLike}
 */
let a;

class Base { }
/**
 * @extends {Base}
 */
class Foo extends Base {
    /**
     * @readonly
     * @private
     */
    x = 0;
    /**
     * @publice
     */
    y = 0;
}

const f = new Foo();
console.log(f.y)