// @ts-check
let isCheck = 12
// @ts-ignore
console.log(isChecked) // 报错

// JSDoc

/**
 * @typedef {(string | number)} NumberLike
 */

/**
 * @param {string} message 
 * @param {NumberLike} age
 * @param {number} [sex = "women"]
 * @return {void}
 */
function sayHello(message, age, sex) {

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