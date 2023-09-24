console.log(JSON.stringify([1, 2, 3, [4, 5, [6], 7], 8]));
console.log(JSON.stringify({ a: [1, 2, [3, [4], 5], 6], b: 2, c: true, d: null, f: { x: 1, y: 'false' } }))

// 对于原始类型的字符串，转换结果会带双引号，当还原的时候就根据内层双引号知道这是字符串
console.log(JSON.stringify('foo') === "foo")
console.log(JSON.stringify('foo') === "\"foo\"")
// 对象中不符合要求的类型直接过滤，正则会转为空对象
console.log(JSON.stringify({ a: undefined, b: function () { }, c: /foo/ }))
// 数组中则变为null，正则会转为空对象
console.log(JSON.stringify([undefined, NaN, function () { }, /foo/]))

// stringfy的第二个参数，指定转哪些属性，只对对象有效，数组无效
const obj = {
    'prop1': 'value1',
    'prop2': 'value2',
    'prop3': 'value3'
}
const selectedProps = ['prop1', 'prop2']
console.log(JSON.stringify(obj, selectedProps))
console.log(JSON.stringify(['a', 'b'], [0]))
// 第二个参数也可以是函数值，用于更改stringfy的返回值
function f(key, value) {
    if (typeof value === "number") {
        value = value * 2;
    }
    return value;
}
console.log(JSON.stringify({ a: 1, b: 2 }, f))
console.log(JSON.stringify([1, '2', 3], f))

// 第三个参数，用于增强返回的JSON格式可读性
// console.log(JSON.stringify({ p1: 1, p2: 2, p3: { a: 1, b: 2, c: [1, 2, 3, [4, 5], 6] } }, null, '\t'))
// 第三个参数如果是数字，那么表示每个属性前添加的空格（最多不超过10）
// console.log(JSON.stringify({ p1: 1, p2: 2, p3: { a: 1, b: 2, c: [1, 2, 3, [4, 5], 6] } }, null, 2))

// 实现stringfy
function checkObjOrArr(value) {
    const result = Object.prototype.toString.call(value).slice("[Object ".length);
    const type = result.slice(0, result.length - 1);
    return type === 'Object' || type === 'Array';
}
function check(value) {
    if (value === null || typeof value === 'number' || typeof value === 'string' || typeof value === 'boolean') {
        return true;
    } else if (typeof value === 'object' && checkObjOrArr(value)) {
        return true;
    }
    return false;
}
function stringify(value) {
    if (!check(value)) {
        if (typeof value === 'object') {
            return "{}";
        }
        return;
    }
    if (typeof value !== 'object' || value === null) {
        if (typeof value === 'string') {
            return `"${value}"`
        } else {
            return value;
        }
    }
    if (Array.isArray(value)) {
        let ret = "";
        value.forEach(v => {
            const res = stringify(v) ?? null;
            if (ret.length !== 0) {
                ret += ",";
            }

            ret += res;
        });
        return `"[${ret}]"`
    } else {
        let ret = "";
        const keys = Object.keys(value);
        keys.forEach(k => {
            const res = stringify(value[k]);
            if (res) {
                if (ret.length !== 0) {
                    ret += ",";
                }

                ret += `"${k}": ${res}`;
            }
        });
        return `"{${ret}}"`
    }
}

console.log(
    stringify(
        {
            a: 1,
            b: 2,
            c: [1, 2, 3, [4, 5, [6], 7], 8],
            d:
            {
                x: 1,
                y: 2,
                z: [1, [2], 3, function () { }, /foo/]
            },
            e: null,
            f: undefined
        }
    )
)