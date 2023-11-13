function sameValueZero(v1, v2) {
    if (typeof v1 === 'number' && typeof v2 === 'number') {
        // +0 -0 或者NaN
        return v1 === v2 || (v1 !== v1 && v2 !== v2);
    }
    return v1 === v2;
}

const itFn = (iteratee, va) => {
    if (typeof iteratee === 'function') {
        return iteratee(va);
    } else if (typeof iteratee === 'string') {
        return va[iteratee];
    }
}

function differenceBy(array, values, iteratee) {
    const res = [];

    for (let i = 0; i < array.length; ++i) {
        const arr = itFn(iteratee, array[i]);
        let sc = true;
        for (let j = 0; j < values.length; ++j) {
            const value = itFn(iteratee, values[j]);
            if (sameValueZero(arr, value)) {
                sc = false;
            }
        }
        if (sc) {
            res.push(array[i]);
        }
    }
    return res;
}

console.log(differenceBy([3.1, 2.2, 1.3], [4.4, 2.5], Math.floor));
console.log(differenceBy([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], 'x'))